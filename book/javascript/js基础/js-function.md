## `Function`
`Function` 构造函数创建一个新的 `Function `对象。直接调用此构造函数可用动态创建函数，但会遇到和` eval `类似的的安全问题和(相对较小的)性能问题。然而，与 eval 不同的是，`Function` 创建的函数只能在全局作用域中运行(准确的说创建的函数中的变量只能获取全局作用域的变量)

```js
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 6));
```

由` Function `构造器创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被` Function `构造器创建时所在的作用域的变量。这一点与使用` eval `执行创建函数的代码不同

在vue中运用了`Function`构造器方法，将字符串转成响应的函数执行。

#### 属性

`Function.arguments` 函数的形参

`Function.caller`  获取调用函数的具体对象

`Function.length` 获取函数参数的类型

`Function.name` 获取函数的名称

`Function.displayName` 获取函数的`display name`

`Function.prototype.constructor` 函数的构造器