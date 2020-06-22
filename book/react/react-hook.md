# React Hook
### 什么是`Hook`

Hook从字面上理解就是钩子，作为在React函数组件中使用状态和生命周期的一种方法。Hook在React16.8版本中被引入，可以在不使用Class组件的情况下也能使用state以及其他React特性的一种方式。

### 为什么需要`Hook`
#### 1. 不必要的组件重构
在为引入Hook之前，我们如果需要用到`状态管理`或者React的`生命周期`，我们只能定义一个Class组件。
比如当前组件的渲染数据是基于后台接口的。
```js
import React from 'react'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getData().then((data = []) => {
            this.setState({
                data
            })
        })
    }

  getData=() => Promise.resolve([]) 

  render() {
      const { data } = this.state
      return (
          <div>
              <p>显示请求结果</p>
              {
                  data.map((i) => (<span key={i}>{i}</span>))
              }
          </div>
      )
  }
}

export default App
```
当我们在不需要使用的状态管理或者生命周期的时候，我们可以定义一个`无状态组件(FSC)`，因为函数式组件更轻便、更优雅，也更能贴合React的设计理念。但当业务发生变化，需要储存状态的时候，我们又不得不将函数式组件改成Class组件。

以上组件我们用hook可以写成下面这样：
```js
import React, { useState, useEffect } from 'react'

function App() {
    const [data, setData] = useState([])
    const getData = () => Promise.resolve([]) 
    useEffect(() => {
        getData().then((resule = []) => {
            setData(resule)
        })
    }, [])
    return (
        <div>
            <p>显示请求结果</p>
            {
                data.map((i) => (<span key={i}>{i}</span>))
            }
        </div>
    )
}
export default App
```

#### 2. 副作用逻辑
在React的Class组件中，副作用主要是在生命周期中引入，比如在`componentDidMount`中修改了页面的title，增加了某些定时器，但是在`componentWillUnmount`中忘记清理这些副作用，这样就会到来一些React的性能问题。
```js
import React from 'react'
class App extends React.Component {

  componentDidMount() {
    document.addEventListener('click',this.getData)
    document.addEventListener('dblclick',this.sendData)
    this.time = setTimeout(() => {
        this.sendOnlineStatus()
    }, 1000)
  }

  componentWillUnmount() {
    // 此处移除事件
    // 此处应该移除定时器
  }
}
```
如果在`React Class`组件的生命周期方法中引入多个副作用，所有副作用将按生命周期方法分组，而不会按副作用的功能来分组。这就是`React Hook`带来的改变，将每个副作用通过一个钩子函数进行封装，而每个钩子函数都会处理各自的副作用，并提供这个副作用的设置和清理。稍后您将在本篇教程中看到如何在`React Hook`中添加和删除监听器来实现这一点。

采用Hooks改写
```js
useEffect(() => {
      document.addEventListener('click', getData)
      document.addEventListener('dblclick', sendData)
      return () => {
          document.removeEventListener('click', getData)
          document.removeEventListener('dblclick', sendData)
      }
  }, [])

useEffect(() => {
    const time = setTimeout(() => {
        sendOnlineStatus()
    }, 1000)
    return () => {
        clearTimeout(time)
    }
}, [])
```

#### 3. 抽象嵌套
在`React`中可以通过`高阶组件`和`Render Props`来实现抽象和可重用性。还有`React Context`及其`Provider`和`消费者组件`所提供的另一个层次的抽象。React中的所有这些高级模式都使用了所谓的包装组件。比如我们将部分公用逻辑封装成一个高阶组件。

- Hoc.jsx

```js
import React from 'react'

function Hoc(Component){
    class HocComponent extends React.PureComponent {
        constructor(props) {
            super(props)
            this.state = {
                data: [12, 4, 512]
            }
        }

        render() {
            return <Component data={this.state.data} {...this.props} />
        }
    }

    HocComponent.displayName = Component.displayName || Component.name || 'Hoc'
    return HocComponent
}

export default Hoc

```

```js
import React from 'react'
import PropTypes from 'prop-types'
import Hoc from './Hoc.jsx'

class HocDemo extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            name: 'hoc-demo',
        }
    }

    render() {
        const { name } = this.state
        const { data } = this.props
        return (<div className="hoc-dome">
            <h5>{name}</h5>
            {data.map((item) => <div key={item}>{item}</div>)}</div>)
    }
}
HocDemo.defaultProps = {
    data: []
}

HocDemo.propTypes = {
    data: PropTypes.array
}

export default Hoc(HocDemo)

```
当打开React Develop的时候就能看到高阶组件也会被单独的渲染出一层

<image src="http://file.qiniu.taoacat.com/uPic/20200420-112027-sx9C9u.png" alt="Hoc Demo">

当业务变的庞大后，往往会产生非常多的包装组件，而这些包装组件对我们实际的业务逻辑调试是没有多大帮助的，如果这些抽象的逻辑在函数组件中被一些封装好的副作用所代替，这些额外的包装组件将不再需要。采用`React Hooks`后所有副作用都可以直接在组件中使用，业务组件为了使用这些副作用，也不需要再引入其他组件所为容器。容器组件消失，逻辑只存在于作为函数的`React Hooks`中

#### 4. Class组件

Class组件采用面向对象的方式编程，我们可以在`constructor`方法里将组件的状态初始化，如果要扩展子类(React.Component)，必须先调用super，然后才能使用this。具体来说，在使用React时，我们还须记住将props传递给super
```js
constructor (props) {
    // 为什么要写super(props)🤔🤔
    super(props)
    this.state = {

    }
  }
```
另外如果不采用箭头函数，我们还需要在初始化时绑定`this`
```js
constructor (props) {
    // ...
    this.doSomething() = this.doSomething.bind(this)
  }
```
组件不同生命周期函数处理相同的逻辑，比如我们有时候会写下下面这样的逻辑代码。
```js
componentDidMount () {
    this.updateData(this.props.id)
 }
componentDidUpdate (prevProps) {
    if (prevProps.id !== this.props.id) {
      this.updateData(this.props.id)
    }
}
updateData = (id) => {
    this.setState({ id })
}
```

采用hook就可以直接这样写
```js
useEffect(() => {
  this.updateData(id)
},[id])
```

当然在React16.3中放弃使用`componentDidUpdate`，当`state`的值在任何时候都取决于 `props`时可以使用`getDerivedStateFromProps`，或者采用为组件绑定一个唯一的key值


### HookAPI

#### useState
##### 1. 使用
组件内的状态采用`useState`来进行维护
```js
import React, { useState } from 'react'
import { Button } from 'antd'

function Main(){
    const [name, setName] = useState('张三')
    return (
        <div className="use-state">
          <h3>{name}</h3>
          <div>
              <Button 
                  onClick={() => {
                      setName(name === '张三' ? '李四' : '张三')
                  }}>
                      更改名字
              </Button>
          </div>
      </div>
    )
}
export default Main
```
##### 2. `useState`参数
`useState()`方法接收唯一的参数，就是初始`state`。可以是一个明确的值（数字、字符串、对象），也可以接收一个带返回值函数。如果不传参数，state的值为`undefined`
```js
const [name, setName] = useState(() => '张三')
```
**如果我们在函数中需要维护多个状态怎么办呢？**
```js
const [name, setName] = useState('张三')
const [age, setAge] = useState(12)
```
我们只要多次调用就可以了。

!>注意：
只在最顶层使用`Hook`
不要在循环，条件或嵌套函数中调用`Hook`， 确保总是在你的`React`函数的最顶层调用他们。遵守这条规则，你就能确保`Hook`在每一次渲染中都按照同样的顺序被调用。这让`React`能够在多次的`useState`和 `useEffect`调用之间保持`hook`状态的正确。

```js
// bad
function UseState({hasAge}){
    const [name, setName] = useState('张三')
    if(hasAge){
      const [age, setAge] = useState(12)
    }
    return (<div className="use-state">...</div>)
}

// good
function UseState({hasAge}){
    const [name, setName] = useState('张三')
    const [age, setAge] = useState(12)
    return (<div className="use-state">...</div>)
}
```

##### 3. `useState`返回值

useState()返回一个数组，当前`state`以及更新`state`的函数。这与`class`里面`this.state.name`和 `this.setState`类似，唯一区别就是你需要成对的获取它们。利用解构可以很方便的获取到他们。

##### 4. `useState`更新时机
`useState`的`setState`函数，接收一个参数，为更新的state的值，可以接收state的类型值，或者接收一个回调函数，回调函数的参数为上次的state，函数返回一个新的state。
```js
setState((i)=>i+1)
```
**在执行setState之后能直接取到最新的state值吗？**
不能，因为setState和Class组件一样也是一个异步的，但是Hook中的setState没有回调函数，可以通过自定义hook解决。

> 思考：为什么不返回一个对象呢？
```js
const {state, setState} = useState('张三')
```

#### useEffect
采用`useEffect`管理状态以及处理副作用
##### 1. 使用
比如以下代码，我们创建一个定时器，定时更新count的显示值
```js
import React, { useState, useEffect } from 'react'

function Demo1(){
    const [count, setCount] = useState(0)

    useEffect(() => {
        const interval = window.setInterval(() => {
            setCount(count + 1)
        }, 1000)
        return () => {
            window.clearInterval(interval)
        }
    }, [count])

    return (
      <div className="use-state">
        <h3>useEffect-demo</h3>
        <p>{count}</p>
      </div>
    )
}
export default UseState

```
`useEffect(fn, deps?:any[])`，`useEffect`接收2个参数。`fn`执行函数，`deps`依赖。与`useState`类似，`fn`在初始化时执行一次。而后续执行则依赖于`deps`的变化，如果`re-render`后执行该`effects`发现此次`deps`与上次不同，就会触发执行。

?> ps: `React`内部使用`Object.is`对`deps`进行浅比较

`fn`为一个函数，可以在`fn`中执行相关副作用，可以在里面请求接口数据，绑定DOM事件等，可以理解为Class组件中的`componentDidMount`。`fn`可选择返回一个清理函数，用于清除组件的副作用，比如清除定时器，注销绑定的事件等。类似于Class组件的`componentWillUnmount`中清除副作用。
`deps`参数可选，不填的时候每次`re-render`都会执行`fn`，传一个空数组表示只有在组件第一次加载的时候执行。`deps`有参数的时候，传递需要监听的值的数组，如：
```js
  useEffect(() => {
        const interval = window.setInterval(() => {
            setCount(count + 1)
        }, 1000)
        return () => {
            window.clearInterval(interval)
        }
    }, [count])
```
当count变化的是会执行`useEffect`中的`fn`。

##### 2. 执行顺序
查看一下代码执行结果
```js
function Demo2(){
    const [count, setCount] = useState(0)
    // hooks1
    useEffect(() => { 
        // render 之后开始执行
        console.log('hooks1')
        setCount(2)
    }, [])
    // hooks2
    useEffect(() => { 
        // render 之后开始执行
        console.log('hooks2-value::', count)
    })
    console.log('Demo2-我渲染了::', count)
    return (<div className="use-state">
        <h3>useEffect-demo2</h3>
        <p>{count}</p>
    </div>)
}
```
输出结果：
```
Demo2-我渲染了::0
hooks1
hooks2-value::0
Demo2-我渲染了::2
hooks2-value::2
```
`useEffect`中的`fn`在渲染之后才会执行

##### 3. 闭包
```js
const [count, setCount] = useState(0)
    
  useEffect(() => {
      setTimeout(() => {
          console.log('Demo3::', count)
      }, 3000)
  })
    
  return (
      <div>
          <p>当前的count值：{count}</p>
          <button onClick={() => setCount(count + 1)}>
              点击
          </button>
      </div>
  )
```
在定时器里执行的事件，完全依赖于闭包，这与Class组件的`componentDidUpdate`中表现不一样
```js
componentDidUpdate() {
  setTimeout(() => {
    console.log('Demo3::', this.state.count)
  }, 3000);
}
```
查看下面代码，思考输出的什么？
```js
function Demo5(){
    const [page, setPage] = useState(0)

    const getData = () => {
        window.setTimeout(() => {
            console.log('Demo5::', page)
        }, 1000)
    }
      
    useEffect(() => {
        setPage(3)
        getData()
    }, [])
      
    return (
        <div>
            <h3>useEffect-demo5</h3>
            <p>当前的page值：{page}</p>
        </div>
    )
}
```
查看下面代码
```js
function Demo6(){
    const [page, setPage] = useState(0)

    const getData = () => {
        window.setTimeout(() => {
            setPage(10)
        }, 4000)
    }

    useEffect(() => {
        getData()
    }, [])
      
    return (
        <div>
            <h3>useEffect-demo6</h3>
            <p>当前的page值：{page}</p>
        </div>
    )
}
```

我们假设getData为一个异步操作，并且等待的时间较长。当我们渲染组件后有切换到其他组件的时候，控制台就会报错

<image src="http://file.qiniu.taoacat.com/uPic/20200420-112137-rsznaG.png">

那是因为在切换到其他页面后，就销毁了当前组件。而useEffect中的闭包没有被销毁，仍然会继续执行，因此`setPage`就会报错。

#### useRef
##### 1. 使用
`useRef`返回一个可变的`ref`对象，其`.current`属性被初始化为传入的参数（initialValue）。返回的`ref`对象在组件的整个生命周期内保持不变。
```js
function Demo1(){
    const [count, setCount] = useState(0)
    let intervalId
    const start = () => {
        intervalId = setInterval(() => {
            setCount((i) => i + 1)
        }, 500)
    }
    const clear = () => {
        clearInterval(intervalId)
    }
    return (
        <div className="use-state">
            <h3>useRef-demo1</h3>
            <p>{count}</p>
            <Button onClick={start} type="button">开始计时</Button>
            <Button onClick={clear} type="button">结束计时</Button>
        </div>
    )
}
```
比如我们有这样一个需求，点击开始计时时开始计时，点击结束计时时结束当前计时。因为`setCount`的时候重新渲染了组件，因此`intervalId`是不可靠的。每次渲染时`intervalId`都是一个`undefined`。采用useRef我们可以这样改
```js
function Demo2(){
    const [count, setCount] = useState(0)
    const intervalIdRef = useRef(0)
    const start = () => {
        intervalIdRef.current = setInterval(() => {
            setCount((i) => i + 1)
        }, 500)
    }
    const clear = () => {
        clearInterval(intervalIdRef.current)
    }
    return (
        <div className="use-state">
            <h3>useRef-demo2</h3>
            <p>{count}</p>
            <Button onClick={start} type="button">开始计时</Button>
            <Button onClick={clear} type="button">结束计时</Button>
        </div>
    )
}
```
> 思考，我们还可以采用什么方式实现？

将`intervalId`的值存到`useRef`的`current`中，`useRef()`比`Class`组件的`ref`属性更有用。它可以很方便地保存`任何`可变值，其类似于在`class`中使用实例字段的方式。

`current`可以存任何值
```js
function Demo2() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <Button onClick={onButtonClick}>获得焦点</Button>
    </>
  )
}
```

!> 注意：
当`ref`对象内容发生变化时，`useRef`并不会通知你。变更`.current`属性不会引发组件重新渲染。如果想要在 `React`绑定或解绑`DOM`节点的`ref`时运行某些代码，则需要使用回调`ref`来实现。
```js
function Demo3(){
    const [height, setHeight] = useState(0)
    const measuredRef = useCallback((node) => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height)
        }
    }, [])

    return (
        <div>
            <h3>useRef-demo3</h3>
            <h1 ref={measuredRef}>Hello, world</h1>
            <h2>h1的高为：{Math.round(height)}px</h2>
        </div>
    )
}
```

#### useLayoutEffect
`useLayoutEffect`与`useEffect`使用一致，区别在于执行时间顺序不一致。`useLayoutEffect`在所有`DOM`变化后同步触发。使用它来从`DOM`读取布局并同步重新渲染。在浏览器有机会绘制之前，将在`useLayoutEffect`内部计划的更新将同步刷新。它会阻塞渲染，所以在不操作dom的情况用`useEffect`，以避免阻止视觉更新。

`useLayoutEffect` 的时候dom已经挂载上了

执行顺序：执行时机 render > useLayoutEffect > requestAnimationFrame > useEffect > useState(dispatch) > 渲染DOM > render(第二遍) > ··· > 渲染DOM

?> 
ps：如果你只是改变数据，首选`useEffect`，因为它不会阻塞渲染。这是优点也是缺点，不阻塞(代表异步)，当然也保证不了顺序。而涉及到 DOM 操作的建议使用`useLayoutEffect`

#### useReducer
```js
const [state, dispatch] = useReducer(reducer, initialState, init?);
```
`useState`的替代方案。`reducer`接收一个`reducer`函数，形如 `(state, action) => newState`的函数，`initialState`为state的初始值，`init`为一个可选参数，初始化初始值。`useReducer`返回当前的`state`以及与其配套的`dispatch`方法。与Redux类似。无论是否命中`reducer`，每次`dispatch`都将触发`re-render`。
```js
const initialState = {count: 0}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```
使用`useState`实现`useRender`
```js
function useMyReducer(reducer, initialState, init) {
  const compatible = init ? init(initialState) : initialState;
  const [state, setState] = useState(compatible);
  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

#### useContext
```js
const value = useContext(MyContext);
```
接收一个`context`对象，也就是由`React.createContext`创建的对象，返回该`context`的当前值。当前的`context`值由上层组件中距离当前组件最近的`<MyContext.Provider>`的`value`值决定。当组件上层最近的  `<MyContext.Provider>`更新时，该`Hook`会触发重渲染，并使用最新传递给`MyContext provider`的`context value`值。

```js
const ContextStore = React.createContext()

function Todo(){
    const value = useContext(ContextStore)
    return (
        <div>
            <h5>子元素：{value}</h5>
        </div>
    )
}

function Main() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <ContextStore.Provider value={count}>
                <Todo />
            </ContextStore.Provider>
            <Button onClick={() => {
                setCount(count + 1)
            }}>点击+1</Button>
        </div>
    )
}
```
#### useMemo
```js
const memoizedValue = useMemo(() => { return result}, deps?[]);
```
`useMemo`可以理解为一种缓存，依赖于传入的值，有固定的输入就一定有固定的输出。不必重新去计算，优化性能。在依赖不改变的情况下避免重新去计算浪费性能。
函数中的result也可以是一个函数。

比如以下组件
```js
function Main() {
    const [count, setCount] = useState(100000)
    const [count2, setCount2] = useState(100)

    // 假设这个地方有个比价耗时的操作
    const countSort = Array.from(count).map(i=>Math.random()).sort()

    useEffect(()=>{
        const t = setInterval(()=>{
            setCount2(x = x+1)
        },500)
        return clearInterval.bind(null,t)
    },[])

    return (
        <div>
            <div>{countSort}</div>
            <div>{count2}</div>
        </div>
    )
}
```
如上面的例子，假如`countSort`的值计算依赖与`count`，而`count2`在定时更新，造成页面定时渲染。页面在渲染的时候会重新计算`countSort`而这种计算是完全可以避免的，因此就可以改成使用`useMomo`

```js

function Main() {
    const [count, setCount] = useState(100000)
    const [count2, setCount2] = useState(100)

    // 只有当count变化的时候才会取计算里面的函数
    const countSort = useMemo(()=>{
        return Array.from(count).map(i=>Math.random()).sort()
    },[count])

    useEffect(()=>{
        const t = setInterval(()=>{
            setCount2(x => x+1)
        },500)
        return clearInterval.bind(null,t)
    },[])

    return (
        <div>
            <div>{countSort}</div>
            <div>{count2}</div>
        </div>
    )
}
```

当然也可以直接引入`eslint-plugin-react-hooks`插件，他能自动修复依赖项。

#### useCallback

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

useCallback就是返回缓存的函数，那么`useCallback`有什么用呢,比如下面例子，我们监听一个`onClick`事件，并给`onClick`传递一个内敛函数，那组建在每次执行`Re-render`的时候，都会触发子组件`props`的变化。在类组件中我们一般传递一个具名函数。

```js

<ChildComponet onClick={()=>{
    // 执行相关函数
}}>

```

那在函数式组件中呢？

```js
   function fn (){
    return '1'
  }

  return (
    <div id="aa">
      <ChildComponet onProps={fn}>值</ChildComponet>
    </div>
  )
```

比如有上面这种写法，函数式组件中还有其他`state`的变化会导致`Re-render`,每次`Rerender`都会得到一个新的fn。也就是每次`Re-render`,`ChildComponet`都会触发先关的变化。这种情况就可以采用`useCallback`包裹一下。这样只要`useCallback`的依赖不变，那`fn`就是一个唯一的。

```js
 const  fn = useCallback(()=>{
    return '112'
 },[])

 return (
    <div id="aa">
      <ChildComponet onProps={fn}>值</ChildComponet>
    </div>
  )

```


#### useImperativeHandle
```js
useImperativeHandle(ref, createHandle, [deps])
```
虽然通过`useRef`可以访问本组件属性。但如果父元素想操作子组件就显得较无能无力。在`Class`组件中你可以使用`this.chilren`去访问子组件方法。但函数组件就没有这项特权了，毕竟没有被实例化，官方提供`useImperativeHandle`向父组件暴露组件方法。`useImperativeHandle`应当与 `forwardRef`一起使用
```js

// input.jsx
function Input(props, ref) {
    const inputRef = useRef()
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus()
        },
        blur: () => {
            inputRef.current.blur()
        }
    }))
    return <input ref={inputRef}/>
}

export default forwardRef(Input)

// index.jsx
function Main() {
    const fancyInputRef = useRef()

    return (
        <div>
            <Input ref={fancyInputRef} />
            <Button onClick={() => {fancyInputRef.current.focus()}}>获取焦点</Button>
            <Button onClick={() => {fancyInputRef.current.blur()}}>失去焦点</Button>
        </div>
    )
}

```

#### useDebugValue
```js
useDebugValue(value)
```
`useDebugValue`可用于在`React`开发者工具中显示自定义`hook`的标签
```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```

### 自定义Hooks
自定义`Hook`是一个函数，其名称以 `use`开头，函数内部可以调用其他的`Hook`。`eslint-plugin-react-hooks`会做检查

在两个组件中使用相同的`Hook`不会共享`state`自定义`Hook`是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义`Hook`时，其中的所有`state`和副作用都是完全隔离的。
在同一个组件中调用自定义组件，每次调用`Hook`，它都会获取独立的`state`。与调用`useState`等一致



### Hook 规则
Hook的本质是Js函数，在使用他时需要遵循2条规则
#### 只在最顶层使用 Hook
不要在循环，条件或嵌套函数中调用`Hook`， 确保总是在你的`React`函数的最顶层调用他们。你就能确保`Hook`在每一次渲染中都按照同样的顺序被调用。这让`React`能够在多次的`useState`和`useEffect`调用之间保持 `hook`状态的正确。
#### 只有在React的函数中调用Hook

1. 可以是函数组件中调用Hook
2. 也可以在自定义的Hook中调用Hook

#### Hook-Eslint校验插件
[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
1. 安装
```bash
npm i eslint-plugin-react-hooks -D
```
2. eslint 配置
```js
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

### Hooks常见问题
目前暂时还没有对应不常用的`getSnapshotBeforeUpdate`和`componentDidCatch`生命周期的`Hook`等价写法。

[Hooks FAQ](https://react.docschina.org/docs/hooks-faq.html)

### 参考文档
[React Hook 中文文档](https://react.docschina.org/docs/hooks-intro.html)

[制定专属自己的 React Hooks](https://juejin.im/post/5d4bcb0a518825262a6bc92e)

[Redux with Hooks](https://juejin.im/post/5d415282f265da03970b96e6)

[【译】什么是React Hooks](https://segmentfault.com/a/1190000019227865?utm_source=tag-newest)

> 文档中配套的demo代码地址：
[react-hook-demo](https://github.com/aitexiaoy/react-hook-demo)