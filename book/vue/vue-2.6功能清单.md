### Vue实例
#### 创建一个实例
```js
const vm  = new Vue({
    data:{
        a:'1'
    },
    el:'#app'
})
```

#### 实例方法
```js
vm.$data === data // true
vm.$el  === document.getElementById('app') // true
vm.$watch('a',function(newValue, oldValue){
    // 在给data的属性a赋值之后出发该函数
})
```

#### 生命周期
1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. beforeDestroy
8. destroyed
9. errorCaptured // 捕获子孙组件的错误

!> 注意：使用生命周期钩子不能采用箭头函数，否则会找不到`this`，这与`React`的类组件不一样，vue中会自动绑定`this`

![生命周期](https://cn.vuejs.org/images/lifecycle.png)

### 模板语法
##### 文本

```html
<span>{{message}}</span>
```
采用`Mustache`语法进行值的绑定，当data中的`message`更改时响应的dom也会跟着变更。

但是如果通过`v-once`指令绑定，只能执行一次性的插值。以后`message`变更，视图也不会变

```html
<span v-once>{{message}}</span>
```
##### html

采用`Mustache`语法的时候插入的值都会被解析成字符串，如果需要插入html内容，可以采用`v-html`指令进行插值。`Mustache`语法中也支持JavaScript表达式。

##### Attribute
`Vue`采用`v-bind`进行属性绑定,

```html
<span v-bind:id="messageId"></span>
```

此处的`messageId`为data属性中的一个变量或者常量，而不是一个字符串。

另外在`v-bind`中也支持<strong>`表达式`</strong>，而不能支持语句。其实在Vue中写在模板中的都支持Javascript表达式。比如`v-if`

```html
<span v-bind:id="a+b"></span>
<span v-bind:id="a ? b : c"></span>
```

##### 指令
vue的指令以`v-`开头，指令后面的`:`后面为参数，比如上面的`id`就是参数。修饰符 (modifier) 是以半角句号`.`指明的特殊后缀。此处的`.prevent`表示`event.preventDefault()`

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

##### 缩写
`v-bind` 缩写成`:`

```html
<span :id="messageId"></span>

<!-- 动态参数的缩写 (2.6.0+) -->
<span :[id]="messageId"></span>
```

`v-on` 缩写成`@`
```html
<form @submit.prevent="onSubmit">...</form>

<!-- 动态参数 （v2.6.0+） -->
<a @[event]="doSomething"> ... </a>
```

##### 动态参数 （v2.6.0+）
```html
<a v-bind:[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
```

`attributeName`如果为`href`将解析成`v-bind:href`,`eventName`为`focus`将解析成`v-on:focus`

!> 注意：在`DOM`中使用模板时 (直接在一个`HTML`文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把`attribute`名全部强制转为小写。当然在`.vue`文件j或者通过下面的方式写入的，不用担心。

```html
<script type="text/x-template" id="hello-world-template">
    <p v-bind:[attributeName]="a">文档</p>
</script>
```

```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

### 计算属性与监听器

#### 计算属性

```html
<div id="app">
    <input v-model="firstName">
    <input v-model="lastName">
    <div>{{fullName}}</div>
</div>
```

```js
const vm  = new Vue({
    el:'#app',
    data:{
        firstName: 'Hello',
        lastName: 'World'
    },
    computed:{
        // getter
        fullName(){  // es6写法可以直接省略function，同 fullName:function(){
            // `this` 指向 vm 实例
            return this.firstName + this.lastName
        }
    }
})
```
我们定义了一个计算属性，用于计算全名`fullName`，`fullName`依赖于`firstName`与`lastName`，当`firstName`或者`lastName`更改的时候就会动态的去计算`fullName`。

计算属性会对运算结果进行`缓存`，如果其所依赖的属性的值没有改变，那计算属性也不会触发改变。这在求某写函数计算的时候特别有用，当然上面的例子也可以直接写在模板中，因为模板语法支持javascript表达式。

#### 计算属性与监听属性

在vue中提供了监听属性`watch`，使用如下

```js
const vm  = new Vue({
    el:'#app',
    data:{
        firstName: 'Hello',
        lastName: 'World',
        fullName:''
    },
    watch:{
        firstName(newVal, oldValue){
            this.fullName = newVal + this.lastName
        },
        lastName(newVal, oldValue){
            this.fullName = this.firstName + newVal
        },
    }
})
```

在上面所举的例子上，显然采用计算属性更方便，当然计算属性也支持`setter`，如下

```js
const vm  = new Vue({
    el:'#app',
    data:{
        firstName: 'Hello',
        lastName: 'World',
        fullName: ''
    },
    computed:{
        fullName:{
            get: function(){
                return this.firstName + this.lastName
            },
            set:function(value){
                [this.firstName,this.lastName] = value.split(' ')
            }
        }
    }
})

```
当运行`vm.fullName = 'John Doe'`时，`setter`会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新

#### 监听器watch
放一个vue官方的例子，一下就明白了
```js
var vm = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
```

### class与style

`v-bind:class` 动态的绑定class名
`v-bind:style` 动态绑定内联样式
他们的语法一直，`:calss` 支持字符串，对象，数组。`:style`支持对象，数组

```html
<!-- 字符串 -->
<div class="static"></div>

<!-- 对象 -->
<div :class="{active:isActive, static:true}"></div>

<!-- 数组 -->
<div :class="[static, isActive?'active':'', {error:isError}]"></div>


<!-- v-bind -->

<!-- 对象 -->
<div :class="{color:'#fff', backgroundColor: '#ff0000'}"></div>

<!-- 数组 -->
<div :class="[{color:'#fff', backgroundColor: '#ff0000'}, {backgroundColor: '#00ff00'}]"></div>

```
当`class`与`bind`作用在组件上的时候，在上层调用的时候，会作用在组建的跟元素上。

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
```html
<my-component class="baz boo"></my-component>
```
最后渲染为

```html
<p class="foo bar baz boo">Hi</p>
```

##### 多重值(v2.3.0+)
从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染`display: flex`

### 条件渲染
#### v-if
```html
<h1 v-if="isTrue">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

或者

```html
<h1 v-if="isTrue">Vue is awesome!</h1>
<h1 v-else-if="is">Oh no 😢</h1>
<h1 v-else>Oh no 😢</h1>
```
`v-if` 条件渲染，`isTrue` 为true的话

`Vue`会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使`Vue`变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换。

#### key
Vue通常会复用已有元素而不是从头开始渲染，这有的时候会带来一些问题，比如以下代码，在更改loginType的时候，input中的已输入内容并不会清空，我们有的时候不需要这种需求，可以为元素动态的绑定唯一的key
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

修改后

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
input元素不会复用了，但是label元素任然会复用，在使用条件渲染的时候需要注意一下。

#### v-show

`v-show`其实就是切换元素的`display`样式，

!> 注意: `v-show`不支持` <template> `元素，也不支持`v-else`

#### v-if与v-show

`v-if`会真正的创建销毁组件，`v-if`所作用的组件会尽力相关的生命周期。当`v-if`的条件为false时将不会渲染元素，而`v-show`则会始终渲染元素。当`v-show`的条件为false时，设置了`display:none`,

!> 注意:不推荐同时使用`v-if`和`v-for` 当`v-if`与`v-for`一起使用时`v-for`具有比`v-if`更高的优先级。

### 列表渲染

#### v-for
用`v-for`指令基于一个数组来渲染一个列表，代码如下，采用`item in items`这种语法，items为一个数组，item为其中的某一项，index为数组的索引。 

```html
<ul id="example-1">
  <li v-for="(item, index) in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```

`v-for` 也支持对象的遍历
```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```
对象可以有三个参数

```html
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

!> 注意：`v-for`在遍历对象时，会按`Object.keys()`的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。

`v-for` 中的 `in` 分割符也可以用`of` 替代，在遍历数组的时候更具有语义化

在使用`v-for`的时候，为了能保证高效的更新并不出错，需要加上一个`key`的`attribute`,使其它能跟踪每个节点的身份，从而重用和重新排序现有元素。

#### 数组更新检测

在vue3.0之前，数组的数据监听是通过截取原型方法来实现的监听，

```js
push()  // 尾部追加
pop() // 尾部移除一个元素
shift() // 头部移除一个元素
unshift() // 头部插入一个元素
splice() // 截取一个元素
sort() // 排序
reverse() // 倒序
```
这些方法都是在原数组上操作，不会更改原数组的指针。

```js
filter()
concat()
slice()
```
而这些方法，将返回一个新的数组，返回新的数组后`Vue`也不会重新渲染整个列表， 为了使得`DOM`元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作

有的时候比如有排序的操作，但是又不想改变原数组，我们可以采用计算属性，

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```

```js
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
 // 传递一个numbers
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

`v-for` 也可以直接对一个`number`类型的进行遍历

```html
<div>
  <!-- 会把span渲染10次 -->
  <span v-for="n in 10">{{ n }} </span>
</div>
```

#### v-for 与 v-if 一同使用

```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

```html
<li v-for="todo in todos" >
    <template v-if="!todo.isComplete">
      {{ todo }}
    <template>
</li>
```

```html
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```

#### 在组件上使用 v-for

在组件上使用`v-for`与在dom上使用一致，只是Vue并不会自动的为组件绑定prop，需要自己手动绑定。

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

### 事件处理

`v-on`绑定事件，`v-on`支持简写`@`

```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```html
<!-- javascript表达式 -->
<button v-on:click="counter += 1">Add 1</button>

<!-- 绑定一个方法 -->
<button v-on:click="handleSayHiClick">say hi</button>

<!-- 传递内联参数 -->
<button v-on:click="handleSayTalkClick('zhangsan')">say talk</button>

<!-- 传递原生DOM事件 -->
<button v-on:click="handleSayTalkClick2('zhangsan', $event)">say talk</button>
```

```js
new Vue({
  el: '#app',
  methods: {
    // 默认参数为event
    handleSayHiClick: function (event) {
      console.log(event)
    },

    // 传递指定参数
    handleSayTalkClick:function (message) {
        console.log(message)
    },

    // 传递指定参数与原生事件
    handleSayTalkClick2:function (message, event) {

    }
  }
})
```

`v-on`支持事件修饰符，事件修饰符可以串联使用，但是使用的时候一定要注意使用顺序，`@click.stop.prevent`

```js
.stop   // event.stopPropagation()
.prevent // event.preventDefault()
.capture //
.self
.once // 事件只绑定一次
.passive // 
```

#### 按键修饰符

可以自定义按键修饰符

```html
<input v-on:keyup.enter="submit">
```
```js
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
.ctrl
.alt
.shift
.meta

```
```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```
鼠标修饰符

```js
.left
.right
.middle
```
### 表单绑定

采用`v-model`实现表单的双向数据绑定，`v-model`其实是提供了一个语法糖，他等效为

`text`和`textarea`元素使用`value`属性和`input`事件；

`checkbox`和`radio`使用`checked`属性和`change`事件；

`select`字段将`value`作为`prop`并将`change`作为事件。

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

等效为

```html
<input v-bind:input="message" v-on:input="message=$event.target.value" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

#### 修饰符

`.lazy` 在`change`后同步数据

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

`.number` 如果想自动将用户的输入值转为数值类型，如果值无法被`parseFloat()`解析，将返回原始值

```html
<input v-model.number="age" type="number">
```

`.trim` 删除收尾空白字符
```html
<input v-model.trim="msg">
```

#### 在组件上使用v-model

只要为组件实现相关的接口就能实现v-model

父组件
```html
<div>
    <self-input v-model="value"><self-input>
</div>
```
子组件 `self-input`
```js
Vue.component('self-input',{
    props:['value'],
    template:`
        <input 
            v-on:input="$emit('change', $event.target.value)"
            v-bind:value="value" 
            type="text"
        >
    `
})
```
更多定义可参考`自定义事件`

### vue组件

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
`data`在在这儿必须是一个函数，也就是保证每个实例可以维护一份被返回对象的独立的拷贝，

#### 解析 DOM 模板时的注意事项

有些`HTML`元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

比如这就有问题，table下限制了tr元素，

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

可以采用`is`来定义

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

当然，如果采用下面方法定义的话，限制就不存在了，同样，`属性，事件`的的大小写问题在下面定义中限制也不存在了。

- 字符串 (例如：template: '...')
- 单文件组件 (.vue)
- `<script type="text/x-template">`

### 组件注册
#### 全局注册
注册组件采用`Vue.component`方法进行注册
```js
Vue.component('my-component-name',{/* ... */})
```
组件名称可以采用`kebab-case`命名发，也就是用`-`将单词连接起来，也可以采用`PascalCase`命名法。

```js
Vue.component('MyComponentName', { /* ... */ })
```

当使用`PascalCase`命名法的时候没在使用的时候`my-component-name`与`MyComponentName`都可以使用，但是在`DOM`中不能直接使用`MyComponentName`

#### 局部注册

```js
const ComponentA = {/*....*/}
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
  }
})
```

在webpack中也可以直接使用`ES6`语法

```js

import ComponentA from './ComponentA.vue'

new Vue({
  el: '#app',
  components: {
    ComponentA,
  }
})
```

#### 使用webpack实现组件的自动化全局注册

通过`require.context`来实现这个需求，`require.context`能遍历出指定目录下的指定文件，相关用法

```js
require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/, mode = 'sync');
```

- `directory` 搜索的目录
- `useSubdirectories` 是否还应该搜索它的子目录
- `regExp` 一个匹配文件的正则表达式

`require.context`返回的对象三个属性`resolve`、`keys`、`id`

- `resolve` 是一个函数，它返回请求被解析后得到的模块 id。
- `keys`也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
- `id` 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到


```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

### 单向数据传递

#### prop

##### 在父组件中使用
`prop`用来将父组件的参数传递给子组件

```html
<!-- 传递一个字符串 -->
<blog-post post-title="hello!"></blog-post>

<!-- 传递一个变量 -->
<blog-post post-title="title"></blog-post>
```

`HTML`中的`attribute`名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用`DOM`中的模板时，`camelCase` (驼峰命名法) 的`prop`名需要使用其等价的 `kebab-case` (短横线分隔命名) 命名，当然在字符串模板中没这个限制。


##### 在子组件中接收

可以以数组的方式接收所有参数

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

也可以用对象的方式限定接收的参数的类型

```js
props:{
    title: String,
    likes: [Number,String],
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
}
```

也可为`props`指定默认值，自定义校验等

```js

props:{
    title: {
        type:String,
        required: true, // 必填字段
        default:'张三' // 默认值"张三"
    }
    likes: [Number,String],
    isPublished: {
        type:Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
            return { message: 'hello' }
        }
    },
    commentIds: {
        type:Array,
        // 自定义校验规则
        validator: function (value) {
            // 这个值必须匹配下列字符串中的一个
            return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
    },
    author: Object,
    callback: Function,
}

```

!> 注意: 那些 `prop` 会在一个组件实例创建之前进行验证，所以实例的属性 (如 `data`、`computed` 等) 在 `default` 或 `validator `函数中是不可用的

type默认能支持js中的几种类型

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

type也可以自定义类型

```js
const Person = function(name){
    this.name = name
}
```
```js
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

#### 单向数据流

父组件将数据传递给子组件，父级 `prop` 的更新会向下流动到子组件中。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生更新时，子组件中所有的 `prop` 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 `prop`。如果你这样做了，`Vue` 会在浏览器的控制台中发出警告

这个 `prop` 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 `prop` 数据来使用

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

如果需要对prop进行处理
```js
props: ['size'],
computed:{
    normalizedSize: function () {
        return this.size.trim().toLowerCase()
  }
}
```

!> 注意：在 `JavaScript` 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 `prop` 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。所以不能再子组件中更改prop的值，保证数据单选流动。


对于没有在子组件中定义的`prop`，而父组件在使用的时候又传了相关的`attribute`的话，那该`attribute`将作用在子组件的根元素上。

对于子组件跟元素上已有的`attribute`，父组件使用时如果定义了相同属性的话，父组件的定义会覆盖子组件的，但是`class`与`style`例外，他们能够将值进行合并。

子组件

```html
<input type="date" class="form-control">
```
父组件使用

```html
<bootstrap-date-input
  type="text"
  data-date-picker="activated"
  class="date-picker-theme-dark"
></bootstrap-date-input>
```
此处的`type='text'`会覆盖子组件的`type='date'`，而`class`将被合并为`class="form-control date-picker-theme-dark"`

#### 用 Attribute 继承

可以通过设置`inheritAttrs:false`可以禁止属性传递，一个比较有用的场景是配合`$attrs`一起使用，这样就不用担心绑定到跟元素上了

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```

```html
<base-input
  v-model="username"
  required
  placeholder="Enter your username"
></base-input>

```

!> 注意: `inheritAttrs: false` 选项不会影响 `style` 和 `class` 的绑定

### 自定义事件

#### 事件名

不同于组件和 `prop`，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称

```js
vm.$emit('onChange',data)
```

```html
<!-- 没有效果 -->
<my-component v-on:my-change="doSomething"></my-component>
```
不同于组件和 `prop`，事件名不会被用作一个 `JavaScript` 变量名或属性名，所以就没有理由使用 `camelCase` 或 `PascalCase`了。并且 `v-on` 事件监听器在 `DOM `模板中会被自动转换为全小写 (因为` HTML `是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`——导致 `myEvent `不可能被监听到。

#### 绑定原生事件

通过`.native`修饰符为组件绑定原生事件

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

在这儿尝试为`<base-input>` 绑定了一个`focus`事件，但是结果可能和想象的不一致，因为`focus`事件作用到了根元素也就是`label`上了。

```html
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```

要使`focus`事件生效，`Vue`提供了`$listeners`,通过`$listeners`可以将所有事件绑定到某个特定的元素下。作用与`prop`中提到的`$attrs`类似

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

#### .sync 修饰符

`.sync`修饰符可以通过事件直接更新父组件中属性的值。

```js
this.$emit('update:title', newTitle)
```

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```
上面等效于

```html
<text-document 
    :title="doc.title"
    @update:title="doc.title = $event"
></text-document>
```
当然采用`.sync`修饰符后，`v-bind`不能跟表达式，不能跟字符串。必须是一个变量。也可以是一个对象，这样能绑定对象中的多个值。


```html
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个属性 (如 title) 都作为一个独立的 `prop` 传进去，然后各自添加用于更新的 `v-on `监听器

### 插槽

> v2.6.0+ 以上版本`v-slot`取代了`slot`，并且在`v2.6.0+`后废除了`slot-scopa`

插槽可使组件运用范围更广，通过`<slot>`元素作为承载分发内容的出口。

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```
在`<navigation-link>` 模板中写成

```html
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
```

这样在`<navigation-link>`中定义了一个插槽，在使用组件的时候就可以插入任何`HTML`模板了。

我们也可以在插槽中加入内容，作为默认的显示内容，下方例子中"Submit"将作为`button`的默认渲染文本。

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

同时可以为`<slot>` 绑定一个`name`，使其成为一个具名插槽。

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
一个不带` name `的 <slot> 出口会带有隐含的名字“default”

在向具名插槽提供内容的时候我们可以采用一个`<template>`元素上使用`v-slot`指令，并以`v-slot`的参数的形式提供其名称。

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
!> `v-slot`只能添加到`<template>`上，这与之前的`slot`使用不同

#### 作用域插槽

如果我们想在父级组件中的插槽中访问子组件中的数据，我们可以在`<slot>`中绑定一个`attribute`

```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

绑定在`<slot>`元素上的`attribute`被称为`插槽prop`。现在在父级作用域中，我们可以使用带值的`v-slot`来定义我们提供的插槽`prop`的名字。

```html
<current-user>
    <template v-slot:default="slotProps">
        {{slotProps.user.lastName}}
    </template>
</current-user>
```
在这个例子中将所有的`插槽prop`的对象重命名为`slotProps`，也可以使用任意名字。

在某些情况，如果被提供的内容只有默认插槽时，组件的标签可以作为插槽的模板来使用，也就是可以少些一层"template"，这样可以直接报`v-slot`直接用在组件上。

```html
<current-user v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
</current-user>
```
上面写法也可简写成

```html
<current-user v-slot="slotProps">
    {{slotProps.user.firstName}}
</current-user>
```
!> 注意：默认插槽的缩写语法不能和具名插槽混用，如果有多个插槽，必须使用插槽完整的语法

```html
<current-user>
    <template v-slot:default="slotProps">
        {{slotProps.user.firstName}}
    </template>

    <template v-slot:foot="footProps">
        ...
    </template>
</current-user>
```

#### 结构插槽Prop

作用域插槽的工作原理是将插槽内容包含在一个传入单个参数的函数中

```js
function(slotProps){
    // 插槽内容
}
```

所以在读取`插槽prop`的时候可以使用任何支持的语法

```html
<current-user v-slot="{user}">
    {{user.name}}
</current-user>
```

```html
<current-user v-slot="{ user = {user:'张三'} }">
    {{user.name}}
</current-user>
```
#### 动态插槽名(v2.6.0+)

```html
<current-name>
    <template v-slot:[dynamicSlotName]>
        ...
    </template>
</current-name>
```

#### 具名插槽缩写

`v-slot`也提供了缩写符号`#`

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
与其他参数缩写一样，只有在其有参数的时候才能进行缩写。default插槽就只能写下面这样

```html
<current-user #default="{user}">
    {{user.name}}
</current-user>

<!-- 这样写无效 -->
<current-user #="{user}">
    {{user.name}}
</current-user>

```

### 动态组件与异步组件

#### 动态组件
为了在标签中切换不同组件，我们可以采用动态组件的方式来实现，在`<component>`中通过`is`属性来切换不同组件，

```html
<!-- 组件会在currentTabComponent改变时进行切换 -->
<component v-bind:is="currentTabComponent"></component>
```
`currentTabComponent`可以包括
- 已注册组件的名字
- 一个组件的选项对象

为了保持动态组件在切换过程中仍能保留之前在组件中的一些操作，我们可以通过`<keep-alive>`将组件缓存起来。

!> 注意: 使用`<keep-alive>`的时候需要被切换的组件都有自己的名字。

当然`<keep-alive>`还可以用在很多其他环节，比如`v-if`,路由切换中。`<keep-alive>`的prop接受三个参数

- `include` 字符串或正则表达式，或者数组。只有名称匹配的组件会缓存 `a,b`,`[a,b]`,`'/a|b/'`
- `exclude` 字符串或表达式，或者数组。匹配到的不缓存 `a,b`,`[a,b]`,`'/a|b/'`
- `max` 数字 最多可以缓存多少个组件

用`<keep-alive>`包裹的组件在非活动状态并不会被销毁，所有在`<keep-alive>`包裹的组件中会触发`activated`和`deactivated`钩子。

```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>

<!-- 配合vue-router使用 -->

<keep-alive>
    <router-view name="path"></router-view>>
</keep-alive>
```

#### 异步组件（组件懒加载）
主要是为了解决在大型项目中，单js文件过大问题。可以把组件拆分一下，等到要使用组件的时候再加载相关的js文件。Vue运行定义一个工厂函数加载组件，工厂函数会异步解析。只有在组件被渲染的时候才会触发工厂函数。并且会把结果缓存起来。

一个推荐的做法是将异步组件和 `webpack` 的 `code-splitting` 功能一起配合使用

```js
Vue.component('async-example',function(resolve,reject){
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请加载
  require(['./my-async-component'], resolve)
})
```

也可以返回也给`Promise`

```js
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```
局部注册时，也可以使用一个`Promise`

```js
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

当然，目前项目中一般采用按路由的方式去切割模块。

异步组件的工厂函数也可以返回一个下列对象(v2.3.0+)

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

### 一些边界情况

####  通过`$root`可以访问根实例
#### 通过`$parent`可以访问父组件
#### 通过 `ref` 可以访问子组件或dom

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput
```

#### 通过依赖注入的方式可以跨组件传递数据，类似`React`的`context`,

`provide` 运行向后代组件提供数据或方法,在父组件中可以这样写

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```
在子代组件中通过`inject`进行申明接收

```js
inject: ['getMap']
```
当然主键注入的方式有效，但是不能滥用。如果有数据交互的需求，可以采用`vuex`。

#### 程序化的事件监听

`Vue`在实例中提供了事件的其他方法
- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

还有一个使用场景，比如使用一些第三方库的时候，在组件加载的时候初始化库，在组件销毁的时候也需要销毁第三方库的实例。我们可以这样写

```js

mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}

```

#### 循环引用，递归组件

##### 递归引用
递归引用就是在组件中自己调用自己，这时`name`属性就是必须的了，另外递归引用的时候必须拥有退出条件，否则会导致无限循环，而栈溢出。

##### 组件之间的循环引用

有个目录树

`<tree-folder>`

```html
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```
`<tree-folder-contents>`

```html
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```
要实现这种，可以通过`Vue.component`进行全局注册。

如果要局部注册在使用`webpack`在打包的时候可能会报错。因为这儿出现了循环依赖。我们可以改一下代码

在`<tree-folder>`使用的时候才去注册他

```js
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
```

或者使用异步组件注册

```js
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

#### 模板定义替代品

```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})

```

#### 使用`$forceUpdate`来进行组件的强制更新

#### 使用`v-once`来创建低开销的静态组件

可以在根元素上添加 `v-once` attribute 以确保这些内容只计算一次然后缓存起来

```js
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```

!> 注意: `v-once`会造成组件不更新，所有不能滥用

### 混入

混入`mixin`就是做组件的功能复用，将组件的数据、方法、生命周期函数合并到一个新的组件中。

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```
混入原则
- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
- 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用
- 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
- 

#### 全局混入

全局混入的时候会使每个组件都会执行相关方法数据

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
```

#### 自定义选项合并

可以通过`Vue.config.optionMergeStrategies`中添加一个参数

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```

### 自定义指令

Vue允许自定义指令,通过`Vue.directive`进行注册

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

也支持注册局部指令，在组件中接受一个`directives`

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

#### 钩子函数
- `bind` 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted` 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update` 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
- `componentUpdated` 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- `unbind` 只调用一次，指令与元素解绑时调用

#### 钩子函数的参数

- `el` 指令绑定的dom
- `binding` 
    - `name` 指令名，不包含`v-`
    - `value` 指令的绑定值，合法的 `JavaScript `表达式
    - `oldValue` 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用
    - `expression` 字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`
    - `arg` 传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`
    - `modifiers` 一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
- `vnode` 虚拟节点
- `oldVnode` 上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用

#### 动态指令参数

指令的参数可以是动态的。例如，在 `v-mydirective:[argument]="value"` 中，`argument `参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用

#### 指令简写
如果想 `bind `和 `update `时触发相同行为，而不关心其它的钩子，可以简写

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### 插件

通过全局`Vue.use()`使用插件，

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

也可传入一个可配置对象

```js
Vue.use(MyPlugin, { someOption: true })
```

#### 开发插件
Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是`Vue`构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局指令
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }

  // 5.注册全局组件
  Vue.component('组件名字'，'组件')

}

export default MyPlugin
```

如果插件提供的是一个对象则其必须有`install`方法，如上所示。如果插件提供一个函数，他会被作为`install`的方法。

```js
MyPlugin=function(Vue, options){
    // 做点什么
}
export default MyPlugin
```

### 过滤器

`Vue.js`允许自定义过滤器，用来作为常见文本的格式化，作用在`Mustache`({{}})或者`v-bind`表达式后面。过滤器添加到`js`表达式的后面，用管道符`|`分割

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

定义本地过滤器

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

全局注册过滤器

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

过滤器前面表达是的值作为过滤器函数的第一个参数，过滤器也可以串联，串联的过滤器把之前过滤器的输出结果作为输入。

```html
{{ message | filterA | filterB }}
```

过滤器也可以接收参数

```html
{{ message | filterA('arg1', arg2) }}
```

其中`message`将作为第一个参数，`arg1`作为第二个参数，依次类推。


### 渲染函数与jsx

### 过度与动画

### Vue-router

`vue-router` 三种模式

`hash`

`history`

`abstract`


### Vuex