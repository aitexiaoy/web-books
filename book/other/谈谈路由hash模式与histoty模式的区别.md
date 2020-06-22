### 哈希路由

哈希路由其实就是利用路由的锚点做资源的定位。通过`onhashchange`事件去监听hash路由的更改。hash路由也会被浏览器记录下来。也就是可以通过浏览器的前进后退来更改路由。hash路由在更改的时候不会向服务器发送资源请求。

利用`window.location`

主要是这几个属性：

`href` 、`hash`、`pathName`、`search`

可以通过直接修改`location.href`后面的`hash`地址(也就是直接修改url`#`号后面的地址)或者直接修改`location.hash`属性可以做到改变Url而不刷新页面（也就是不向服务器端发送请求）



```js
window.onhashchange = function(event){
    console.log(event)
}
```

特点：

- hash路由带一个`#`，不支持页面内的锚点

- hash路由能支持到IE8+

- 传参数只能通过路由的方式传递

- `onhashchange`只能监听到`#`号后面路由的变更

### History

History是html5新增的一个对象，

#### 属性

`History.scrollRestoration` 允许Web应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。

`History.state` 返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待popstate 事件而查看状态而的方式

##### 方法

- `History.back()`  前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 `history.go(-1)` 如果当前处于第一条的话执行也不报错，没效果。

- `History.forward()` 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 history.go(1)。如果当前处于历史栈顶的话执行也不报错，没效果。

- `History.go()` 跳转到相对当前页面的历史栈页面。如果参数超出返回或者参数不存在，不会报错也没有效果

- `History.pushState()` 按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；你可以指定任何可以被序列化的javascript对象

- `History.replaceState()` 按指定的数据，名称和URL(如果提供该参数)，更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。

`pushState()`与`replaceState()` 操作相同，结果不同，下面以`pushState()`举例

`pushState()` 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL. 让我们来解释下这三个参数详细内容：

1. 状态对象: 状态对象state是一个JavaScript对象，通过pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate事件就会被触发，且该事件的state属性包含该历史记录条目状态对象的副本。

状态对象可以是能被序列化的任何东西。原因在于Firefox将状态对象保存在用户的磁盘上，以便在用户重启浏览器时使用，我们规定了状态对象在序列化表示后有640k的大小限制。如果你给 pushState() 方法传了一个序列化后大于640k的状态对象，该方法会抛出异常。如果你需要更大的空间，建议使用 sessionStorage 以及 localStorage.

2. 标题 — `Firefox` 目前忽略这个参数，但未来可能会用到。在此处传一个空字符串应该可以安全的防范未来这个方法的更改。或者，你可以为跳转的state传递一个短标题。

3. `URL` — 该参数定义了新的历史URL记录。注意，调用` pushState() `后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理。新URL必须与当前URL同源，否则`pushState() `会抛出一个异常。该参数是可选的，缺省为当前URL。

通过`history.pushState`、`history.replaceState`、`history.go`、`history.forward`、`history.back`能做到更改url而不进行接口请求。

```js
let stateObj = {
    foo: "bar",
};

history.pushState(stateObj, "page 2", "bar.html");
```

通过`window.onpopstate`事件可以监听到除了`history.pushState()`与`history.replaceState()`之外的url变化。 

`history.pushState()`与`history.replaceState()`方法只更改url的hash部分也不会触发`hashchange`

```js
window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
//绑定事件处理函数. 
history.pushState({page: 1}, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({page: 2}, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({page: 3}, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2);  // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}

```

如果页面重启，可以通过`History.state`属性获得相关state

特点：

- history没有`#`,支持页面内的锚点

- 兼容IE10+

- 可以不通过路由传递参数

- 需要在服务端对请求做响应的处理，因为页面`刷新`的时候回去服务端请求相关资源。在服务端需要知道资源都为一个html
