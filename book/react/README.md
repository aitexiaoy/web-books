### 全局API

### 创建React组件
- 组件中必须(也有非必须的方案)有且只有一个根节点
#### 1.函数式创建
- app.jsx

```js
import React from 'react'
function App(props){
    return (<div>我是app</div>)
}
```
纯函数式创建的组件无声明周期，无state。适合无状态的组件使用。官方推荐。如果想使用状态，React在16.8增建了`HOOKS`

#### 2.ES6类式创建
- app.jsx

```js
import React from 'react'
class App extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    // 相关生命周期函数用不到的话可以省略
    // ...

    // 类式申明的组件必须要用render函数
    render(){
        return (<div></div>)
    }
}
```
#### 3.采用React class创建
- app.jsx

```js
var createReactClass = require('create-react-class')
var Hello = createReactClass({
    // 声明默认属性
    getDefaultProps: function(){
        return {
            name: 'pomy',
            git: 'dwqs'
        }
    },
    
    render: function(){
        return (
            <div>Hello,{this.props.name},git username is {this.props.dwqs}</div>
        )
    }
});
```


### Component 生命周期
采用`Component`创建组件的方式介绍生命周期

参考文档：
[官方中文文档](https://zh-hans.reactjs.org/docs/react-component.html)

#### constructor()
构造函数方法，在组件最开始的时候就会调用这个方法，可以进行一些数据的初始化。在初始化组件的时候执行一次。
```js
class App extends React.Component{
    constructor(props) {
      super(props);
      // 不要在这里调用 this.setState()
      this.state = { counter: 0 };
      this.data=[];
      this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const {counter}=this.state
        return <div>{counter}</div>
    },
}

```
<div style="background-color:#ffe564bf; padding:10px;">
<strong>
注意：避免将 props 的值复制给 state！

```js 
constructor(props) {
 super(props);
 // 不要这样做
 this.state = { color: props.color };
}
```
当这样做的时候父组件props更新的时候，子组件中的state不会更新。如果非要这样做可以在父组件中加一个<b style="color:#e96900">key</b>进行强制渲染。或者在子组件中采用<b style="color:#e96900">getDerivedStateFromProps</b>进行动态的更新state
</strong>
</div>

#### componentDidMount()
在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。一般在此周期内加载`网络`请求，可以在该周期内天添加订阅方法。也可以在该周期内调用`setState`更改state中的值，当然这会第二次调用render()函数，需要谨慎使用，最好在`constructor`中初始化好相关数据。
```js
class App extends React.Component {
    componentDidMount(){
        console.log(this.getDOMNode())
    }
    render(){
        return <div></div>
    },
}
```

#### shouldComponentUpdate()
```js
shouldComponentUpdate(nextProps, nextState)
```
更加改周期的返回值，React判读是否调用`Render`函数，返回false则不调用渲染函数。当`props`或者`state`改变时就会执行此方法。改方法主要用于性能优化，减少因`state`或者`props`改变造成不必要的渲染开销。`PureComponent`内部会对`props`和`state`进行浅层比较，并减少了跳过必要更新的可能性。
```js
class App extends React.Component{
    shouldComponentUpdate(nextProps,nextState){
        return this.state.checked === nextState.checked;
        //return false 则不更新组件
    }
    render(){
        return <div></div>
    },
}
```

#### static getDerivedStateFromProps()
```js
static getDerivedStateFromProps(props, state)
```
刚方法会在调用`render`方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新`state`，如果返回`null`则不更新任何内容。主要的使用环境是当父组件的`props`改变后，子组件的`state`状态依赖与父组件的`props`,这个时候就可以去更新`state`了。
```js
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}
```
<b>注意：</b> 改方法会在每次渲染前触发这与<del>`componentWillReceiveProps`</del>不一致，后者只在父组件props改变的时候触发。

#### getSnapshotBeforeUpdate()

改方法在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。

应返回 snapshot 的值（或 null）。

```js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```


#### componentDidUpdate()

在更新后调用，首次渲染不会执行此方法。当组件更新后，可以对`DOM`进行操作，或者请求新的网络请求，也可在此周期内使用`setState`,当然使用setState必须增加限制条件，否者会进入无限循环。
```js
componentDidUpdate(prevProps, prevState, snapshot){
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
如果组件实现了`getSnapshotBeforeUpdate()`生命周期，则它的返回值将作为 `componentDidUpdate`的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

#### render()
render()方法是组件中唯一必须实现的方法。
当`render`被调用时，它会检查`this.props`和`this.state`的变化并返回以下类型之一:

- <b>React 元素。</b>通常通过JSX创建。例如，`<div/>`会被React渲染为DOM节点，`<MyComponent/>` 会被React渲染为自定义组件，无论是`<div />`还是`<MyComponent/>`均为 React 元素。
- <b>数组或 fragments。</b> 使得 render 方法可以返回多个元素。
- <b>Portals。</b>可以渲染子节点到不同的 DOM 子树中。
- <b>字符串或数值类型。</b>它们在 DOM 中会被渲染为文本节点
- <b>布尔类型或 null。</b>什么都不渲染。（主要用于支持返回 `test&&<Child/>`的模式，其中 test 为布尔类型。)

render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

#### componentWillUnmount()

组件在销毁前执行的函数，可以在组件内清空注册的`事件`、`定时器`等。

#### static getDerivedStateFromError()
```js
static getDerivedStateFromError(error)
```
此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级  UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```
<div style="background-color:#ffe564bf; padding:10px;">
<strong>
  <h4>注意:</h4>
  getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。
</strong>
</div>

#### componentDidCatch()
```js
componentDidCatch(error, info)
```
此生命周期在后代组件抛出错误后被调用。 它接收两个参数：
1. error —— 抛出的错误。
2. info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

`componentDidCatch()` 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // "组件堆栈" 例子:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```
`getDerivedStateFromError`与`componentDidCatch`被称为`Error boundaries`,它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。


#### <del> componentWillMount </del> (方法已废弃)

该方法在首次渲染之前调用，也是再 render 方法调用之前修改 state 的最后一次机会。该名称将继续使用至 `React 17`新的名称为`UNSAFE_componentWillMount()`


#### <del> componentWillReceiveProps </del> (方法已废弃)
组件的 props 属性可以通过父组件来更改，这时，componentWillReceiveProps 将来被调用。可以在这个方法里更新 state,以触发 render 方法重新渲染组件。

```js
class App extends React.Component{
    componentWillReceiveProps(nextProps){
        if(nextProps.checked !== undefined){
            this.setState({
                checked: nextProps.checked
            })
        }
    }
    render(){
        return <div></div>
    },
}
```

### Component API与其他属性

#### setState
```js
setState(updater[, callback])
```
#### forceUpdate()
```js
forceUpdate(callback)
```
默认情况下，当组件的state或props发生变化时，组件将重新渲染。如果render()方法依赖于其他数据，则可以调用`forceUpdate()`强制让组件重新渲染。

调用`forceUpdate()`将致使组件调用`render()`方法，此操作会跳过该组件的 `shouldComponentUpdate()`。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate()方法。如果标记发生变化，React仍将只更新DOM。通常你应该避免使用 forceUpdate()，尽量在 render() 只使用this.props和this.state

#### defaultProps
defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```
#### displayName
displayName 字符串多用于调试消息。通常，你不需要设置它，因为它可以根据函数组件或 class 组件的名称推断出来。如果调试时需要显示不同的名称或创建高阶组件，

#### propTypes
用于定义props中参数的类型，对类型进行校验。

#### props
this.props 包括被该组件调用者定义的 props

需特别注意，`this.props.children` 是一个特殊的 prop，通常由 JSX 表达式中的子组件组成，而非组件本身定义

#### state
组件中的 state 包含了随时可能发生变化的数据。state 由用户自定义，它是一个普通 JavaScript 对象。如果定义的值不参与动态更新DOM，不比将该值设置为state，直接在组件实例上定义。


### state的使用
setState将更改的state放入到队列中，并且通知React需要更新重新渲染，执行setState后不会立即执行更新组件的操作，React或延迟调用更新组件，如果还有其他更改state的操作，React会一次传递多个更新。也就是批量推迟更新。如果需要读取更新后的state应对在`setState`的回调或者在`componentDidUpdate`中读取。
```js
// 利用函数设置
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
或者
```js
// 直接使用，注意在更改comment值后在下面不能直接拿到comment的新值，要取值的话可以采用回调的方式
this.setState({comment: 'Hello'});
this.setState({comment:'hello'},
  (nextState)=>{
    console.log(nextState.comment)
  })
```

### 组件之间的传参
#### 父子组件传参采用props


### 状态管理器 Redux

### 路由 react-router-dom


### jsx语法相关

#### 标签类型
在JSX语法中，使用的标签类型有两种：DOM类型的标签（div、span等)和React组件类型的标签（关注后面文章）。DOM类型的标签需要标签的首字母小写，React组件类型的标签需要首字母大写。React也是通过首字母的大小写来判断渲染的是哪种类型的标签。

#### JSX语法
在{}中写入相关代码,jsx不支持if else ，支持三元运算符。


#### JSX添加style
```js
<script type="text/babel">
    var ok=1;
    ReactDOM.render(
        <div>
            <p style={{
                color:"red",
                fontSize:50
            }}>{ok==1?"我很帅":"我很有才华"}</p>
        </div>,
        document.querySelector("#wrap")
    )
</script>
```

#### JSX属性名
1. 所有的属性都是驼峰命名的； 
2. class 属性 改为 className； 
3. for 属性 改为 htmlFor； 
4. colspan 属性 改为 colSpan

#### 事件
`onCLick`、`onMouseOver`等


### react-router
```js
React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
       {/* 当 url 为/时渲染 Dshboard */}
      <IndexRoute component={Dashboard} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)
```
### PropTypes 验证器
```js
import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 利用属性做更多得事
   }
}

MyComponent.propTypes = {
//你可以定义一个属性是特定的JS类型（Array,Boolean,Function,Number,Object,String,Symbol）。默认情况下，这些都是可选的。

optionalArray: PropTypes.array,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol,

//指定类型为：任何可以被渲染的元素，包括数字，字符串，react 元素，数组，fragment。
optionalNode: PropTypes.node,

// 指定类型为：一个react 元素
optionalElement: PropTypes.element,

//你可以类型为某个类的实例，这里使用JS的instanceOf操作符实现
optionalMessage: PropTypes.instanceOf(Message),


//指定枚举类型：你可以把属性限制在某些特定值之内
optionalEnum: PropTypes.oneOf(['News', 'Photos']),

// 指定多个类型：你也可以把属性类型限制在某些指定的类型范围内
optionalUnion: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Message)
]),

// 指定某个类型的数组
optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

// 指定类型为对象，且对象属性值是特定的类型
optionalObjectOf: PropTypes.objectOf(PropTypes.number),


//指定类型为对象，且可以规定哪些属性必须有，哪些属性可以没有
optionalObjectWithShape: PropTypes.shape({
  optionalProperty: PropTypes.string,
  requiredProperty: PropTypes.number.isRequired
}),

// 指定类型为对象，且可以指定对象的哪些属性必须有，哪些属性可以没有。如果出现没有定义的属性，会出现警告。
//下面的代码optionalObjectWithStrictShape的属性值为对象，但是对象的属性最多有两个，optionalProperty 和 requiredProperty。
//出现第三个属性，控制台出现警告。
optionalObjectWithStrictShape: PropTypes.exact({
  optionalProperty: PropTypes.string,
  requiredProperty: PropTypes.number.isRequired
}),

//加上isReqired限制，可以指定某个属性必须提供，如果没有出现警告。
requiredFunc: PropTypes.func.isRequired,
requiredAny: PropTypes.any.isRequired,

// 你也可以指定一个自定义的验证器。如果验证不通过，它应该返回Error对象，而不是`console.warn `或抛出错误。`oneOfType`中不起作用。
customProp: function(props, propName, componentName) {
  if (!/matchme/.test(props[propName])) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    );
  }
},

//你也可以提供一个自定义的验证器 arrayOf和objectOf。如果验证失败，它应该返回一个Error对象。
//验证器用来验证数组或对象的每个值。验证器的前两个参数是数组或对象本身，还有对应的key。
customArrayProp: PropTypes.arrayOf(function(propValue, key,     componentName, location, propFullName) {
  if (!/matchme/.test(propValue[key])) {
    return new Error(
      'Invalid prop `' + propFullName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    );
  }
})
```

### Fragments
对于一个组件中需要返回多个并列的节点的
```jsx
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
或者

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

### Refs
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  // 访问
  const node = this.myRef.current;
  
  render() {
    return <div ref={this.myRef} />;
  }
}
```

或者采用回调的方式

```js
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 回调才可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }
  
  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}

```

### Context
可以用于跨父子组件传参

#### 新的用法
###### 1.创建一个context
- theme-context.js

```js
export const themes = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: '#eeeeee',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);

```
###### 2.祖先组件

- app.js

```js
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// 一个使用到ThemedButton组件的中间组件
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:state.theme === themes.dark? themes.light: themes.dark,
      }));
    };
  }

  render() {
    // ThemedButton 位于 ThemeProvider 内
    // 在外部使用时使用来自 state 里面的 theme
    // 默认 dark theme
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```

###### 3.子组件

```js
import {ThemeContext} from './theme-context';

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{backgroundColor: theme.background}}
        />

      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;
```

###### 总结
祖先组件采用Provider包裹起来，子组件采用Consumers进行接收,每当Provider的值发生改变时, 作为Provider后代的所有Consumers都会重新渲染。 从Provider到其后代的Consumers传播不受shouldComponentUpdate方法的约束，因此即使祖先组件退出更新时，后代Consumer也会被更新。


#### 之前的使用方式
1.在祖先组件中定义

- Form.js

```js

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // 传值
  getChildContext(){
    return {
      component: this
    };
  }

  render(){
    return ()
  }
}

// 声明类型
Form.childContextTypes = {
  component: PropTypes.any
};

```

在子组件中

- form-item.js

```js
export default class FormItem extends Component {
    constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  // 使用 this.context
  parent(){
    return this.context.component;
  }
  
}
 
// 声明要就收的祖先组件的参数
FormItem.contextTypes = {
  component: PropTypes.any
};

```

### Hooks

Hooks部分请见文档[Hooks](/book/react/react-hook)