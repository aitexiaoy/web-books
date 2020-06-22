### js任务队列

[JS任务队列](/book/javascript/js-任务队列.md)

### js数据类型与数据结构

#### 1. 数据类型

##### a. 基本数据类型(7种)

所有基本类型的值都是不可改变的。但需要注意的是，基本类型本身和一个赋值为基本类型的`变量`的区别。变量会被赋予一个新值，而原值不能像数组、对象以及函数那样被改变。比如函数的参数如果是基本类型，那在函数中的操作都是操作参数的副本。

`String`、`Boolearn`、`Number`、`Bigint`、`Null`、`Undefined`、`Symbol`

```js
let foo = 5

function add(f){
    f+=4
}

add(foo)

console.log(foo) // 5

```

`Null` 类型比较特殊
```js
typeof null ==='object'
```

##### 标准对象和函数

`Object`、`Function`

##### 日期

`Date`

##### 有序集：数组和类型数组

`Array`

类型数组

`Int8Array`、 `Uint8Array`、`Uint8ClampedArray`、`Int16Array`、`Uint16Array`、`Int32Array`、`Uint32Array`	、`Float32Array`、`Float64Array`、`BigInt64Array`、`BigUint64Array`

##### 键控集

`Set`、`Map`、`WeakSet`、`WeakMap`

##### 结构化数据

`JSON`

##### 其他

`RegExp`、`Math`

### Object

[Object相关Api](/book/javascript/js-object.md)



### 作用域与闭包

[作用域与闭包](/book/javascript/作用域与闭包.md)


### 对象的浅拷贝与深拷贝

[对象拷贝](/book/javascript/js-对象拷贝.md)


### JS原型与继承

[JS原型与继承](/book/javascript/原型与继承.md)


### bind、apply、call

[说说bind、apply、call](/book/javascript/bind-apply-call.md)


### this对象与箭头函数

[this对象与箭头函数](/book/javascript/this与箭头函数.md)

### Set 和 Map (ES6)

[Set与Map数据结构](/book/javascript/es6/Set与Map数据结构.md)

### Proxy 对象 (ES6)

[proxy](/book/javascript/es6/proxy.md)

### 迭代器

[JS高级程序指南读书笔记](/book/js/JavaScript高级程序指南读书笔记.md)