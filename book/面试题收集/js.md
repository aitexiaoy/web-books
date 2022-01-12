知道 JS 数据类型、类型判断方式；知道浮点数精度问题、最大安全整数；

```js
console.log(Number.MAX_SAFE_INTEGER) //9007199254740991
console.log(Number.MIN_SAFE_INTEGER) //-9007199254740991
```

知道 new String(1) String(1)区别，知道封箱/开箱；

知道 New 调用过程；

```js
/*
  create函数要接受不定量的参数，第一个参数是构造函数（也就是new操作符的目标函数），其余参数被构造函数使用。
  new Create() 是一种js语法糖。我们可以用函数调用的方式模拟实现
*/
function create(Con, ...args) {
    //1、创建一个空的对象
    let obj = {} // let obj = Object.create({});
    //2、将空对象的原型prototype指向构造函数的原型
    Object.setPrototypeOf(obj, Con.prototype) // obj.__proto__ = Con.prototype
    //3、改变构造函数的上下文（this）,并将剩余的参数传入
    let result = Con.apply(obj, args)
    //4、在构造函数有返回值的情况进行判断
    return result instanceof Object ? result : obj
}
```

知道原型与原型链基本概念；

知道 apply/bind/call 区别与作用，箭头函数无法改变 this 和 new 操作；

属性访问/设置，知道属性描述符，Object.freeze 等方法；

知道 promise/async/await 概念；

知道事件循环，宏任务/微任务概念；

知道变量提升、词法作用域、暂存死区概念；

展开多维数组 使用flat
[Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
