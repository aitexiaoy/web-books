
#### 为什么使用`reselect`
在`react-redux`的概念中，将组件分为容器组件与视图组件

- `容器组件` 只负责逻辑计算，不负责视图呈现
- `视图组件` 只负责视图部分，不负责逻辑计算

在`react-redux`中的通过`connect`将容器组件与视图组件连接起来。

```js
connect(mapStateToProps, mapDispatchToProps)(View)
```

`mapStateToProps` mapStateToProps是一个函数，函数返回一个需要通过props传递给视图组件的对象，

```js
const mapStateToProps = (state, props) => {
  // state一改变我就要取值
  return {
    todos: [1,2,3]
  }
}
```

`mapDispatchToProps` 用来建立视图组件的参数到`store.dispatch`方法的映射。它定义了哪些用户的操作应该当作`Action`。

```js
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```

在容器组件中，每次`reducers`中的`state`变更的时候（任何state包括其他模块的state），都会触发`mapStateToProps`所在的函数，如果项目规模比较大，并且在`mapStateToProps`中进行一些计算的时候，就会增加计算量，影响项目的运行效率。因此我们引入了`reselect`。

#### 如何使用`reselect`

`reselect`可以对传入的依赖做一个缓存，如果传入的函数的结果不变，那返回的结果也不会变

`reselect`使用方式

```js
const mySelector = createSelector(
  state => state.values.value1,
  state => state.values.value2,
  (value1, value2) => value1 + value2
)

// 也能把第一个参数作为一个数组
const totalSelector = createSelector(
  [
    state => state.values.value1,
    state => state.values.value2
  ],
  (value1, value2) => value1 + value2
)
```

举个例子

```js
import { createSelector } from 'reselect'

const getPageA = state => {
    // state一改变我就要取值
    return state.pageB.get('number')
} 

const getPageAObj = state => {
    // state一改变我就要取值
    return state.pageB.getIn(['obj'])
} 

const selectorProps = createSelector([getPageA, getPageAObj], (number, nameObj) => {
    // number与nameObj变更了后我才计算下面的，要是没变的话直接返回上次的值
    return {
        number:dealNumber(number)
    }
})

export default connect(selectorProps, actionCreator)(View)
```

如上的例子，在`state`变更的时候，就会触发`getPageA`与`getPageAObj`函数。如果`createSelector`依赖的这两个函数的结果没有变更，那就不会执行`dealNumber`相关的操作，而是直接返回上次已经计算好的结果。

#### 总结：

1. 在容器组件中采用`createSelector`对计算进行缓存

2. 在依赖函数中只直接取值，不针对值进行计算，将计算放到`createSelector`中最后一个参数的函数中。

3. `createSelector`中的依赖结果值要唯一，如果采用了`Immutable`结构，不能在依赖函数中执行`toJS()`方法。因为`toJS()`每次都返回一个新的对象, `createSelector`内部采用`===`做简单比较

4. 如果采用了`Immutable`对数据进行了包装，那`state`中某个属性变更后返回的都是一个新的`state`, 这样在
`createSelector`中的依赖函数所返回的值都将是一个新的值，也将会触发相关的重新计算。如果计算量比较大的话，可以考虑将`state`拆分成多个子`state`, 再通过`combineReducers`组合起来。否则`createSelector`也就不起作用了。


!> 注意：关于`state`变更。如果有`pageA`与`pageB`,通过`redux`的`combineReducers`方法将`pageA`与`pageB`合并成一个大的`state`，更改了`pageA`中的state的时候，也会触发`pageB`中所绑定的函数

