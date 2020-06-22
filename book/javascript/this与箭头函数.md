#### 输出下列结果

箭头函数表达式的语法比函数表达式更简洁，并且没有自己的`this`，`arguments`，`super`或`new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数

##### 1. 箭头函数没有自己的this，
箭头函数总是从作用域的上层去找this
```js
function Persion(){
	this.age = '12'
	// 这里的this指向Persion的实例
	setInterval(()=>{
		this.age += 1
	},100)
	
	// 在非严格模式下这里的this指向windows
	setInterval(function(){
		this.age += 1
	},100)
}
var p = new Persion()
```

##### 2. 通过apply、call、bind不能绑定this，只能绑定后面的参数
```js
var addr = {
	this.base = 1
	add:function(a){
		const f = v => v + this.base
		return f(a)
	}
	addCall:function(a){
		const f = v => v + this.base
		var b = {
			base:2
		}
		return f.call(b,a)
	}
}
addr.add(1) //2
addr.addCall(1) //2
```

##### 3. 不绑定arguments
```js
const arguments = [1,2,3]
let var = () => arguments[0]
var(4) // 1

// 这与function函数不一样，function的arguments是一个类数组结构，通过argumnets访问传入函数的参数

function foo(n){
	let f = () => arguments[0] + n
	return f()
}
foo(1) // 2
foo(2) //4

```
要想在箭头函数中获取到输入的参数，可通过`剩余参数`进行解构

```js
function foo(arg){
	var f = (...args) => args[0]
	return f(arg)
}
foo(1) //1
```

##### 4. 箭头函数作为方法
```js
var c={a:'123'}
var obj={
	[c]:'123',
	f1:()=>{
		console.log(this,this.c)
	},
	f2:function(){
		console.log(this,this.c)
	}
}
	
obj.f1()
obj.f2()
// Window {} {a: "123"} //严格模式下因为this为undefined，所以this.c报错
// {[object Object]: "123", f1: ƒ, f2: ƒ} undefined
```

##### 5. 使用new操作符
```
const Foo = () => {}
const f = new Foo() //Uncaught TypeError: foo is not a constructor
```

##### 6. 使用prototype属性

箭头函数没有原型

```js
const Foo = () => {}
console.log(Foo.protorype) //undefined
```

##### 7. 使用yield关键字

`yield`关键字不能再箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作函数生成器

##### 8. 箭头函数可以直接简写成一个块体
```js
const foo = x => x*x
const foo = (x,y) => (x + y)
有返回值的函数可以不用return关键词，直接简写。只有一个参的key省略函数入参时候的括号
```

##### 9. 解析顺序

虽然箭头函数中的箭头不是运算符，但是箭头函数具有与常规函数不同的特殊运算符优先级。

```js
let callback
callback = callback || functin(){} //ok
callback = callback || () => {}
// SyntaxError: invalid arrow-function arguments
callback = callback || (() => {});    // ok
```

##### 10 .立即执行函数

```js
// 先看function的立即执行函数写法
(function(){console.log('liqin')})()
// 或者
(function(){console.log('liqin')}())

// 但是箭头韩式只支持一种

(()=>{console.log('liqin')})()

```

##### 11.闭包

```js
function A(){
	var i = 0
	return function b(){
		return (++i)
	}
}
var v = A()
v() //1
v() //2

// 箭头函数的闭包
var Add = (i=0) => (()=>(++i))
var v = Add()
v() //1
v() //2
```
