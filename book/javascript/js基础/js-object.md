## Object
自有属性
```js
{
    writable: true, // 可写属性，也就是可以被赋值，为fasle的话赋值会不成功
    enumerable: true, // 可枚举属性
    configurable: true  // 可以配置的属性
}
```

### Object.assign (ES6)
 将所有可枚举属性的值从一个或多个对象拷贝到目标对象，返回目标对象。
```js
Object.assign(target,...source)
```
```js
const target = {a:'1',b:'2'}
const source = {c:'3'}

console.log(Object.assign(target,source))
// {a:'1',b:'2',c:'3'}

```
`Object.assign`只适合浅拷贝可枚举属性，底层使用target的`[[set]]`以及source的`[[get]]`

```js

const target = {a:'1',b:'2'}
const source = {c:'3'}
Object.defineProperty(source,'c',{
    writable:false,
})
console.log(Object.getOwnPropertyDescriptor(Object.assign(target,source),'c'))

// {
//     value: "3"
//     writable: true
//     enumerable: true
//     configurable: true
// }
```
可以看到虽然value拷贝过去了，但是自有属性并没有拷贝过去

###### 继承属性与不可枚举属性不能拷贝
```js
const obj = Object.create({a:'1'},{ // a 为继承属性
    b:{ // 不可枚举属性
        value:'2' 
    },
    c:{ // 可枚举属性
        value:'3',
        enumerable:true
    }
})

console.log(Object.assign({},obj))

// {c: "3"}

```

###### 拷贝访问器
```js
const obj = {
    a:'1',
    get bar(){
        return '2'
    }
}
console.log(Object.assign({},obj))
// { a: '1', bar: '2' }
```

###### 拷贝自有属性
```js
function componentAssign(target,...sources){
    sources.forEach(source=>{
        // 获得可枚举属性
        let descriptors = Object.keys(source).reduce((descriptors, key)=>{
            descriptors[key]=Object.getOwnPropertyDescriptor(source,key)
        },{})

        // 获得类型为Symbol类型的键值
        Object.getOwnPropertySymbols(source).forEach(sym=>{
            let descriptor = Object.getOwnPropertyDescriptor(source,sym)
            if(descriptor.enumerable){
                descriptors[sym]=descriptor
            }
        })

        Object.defineProperties(target,descriptors)
    })
    return target
}

const a = {a:'1'}
const b = {[Symbol('b')]:'2'}
console.log(componentAssign(a,b))
// {a: "1", Symbol(b): "2"}

```
###### `polyfill`

```js
if(typeof Object.assign !== 'function'){
    Object.defineProperty(Object,'assign',{
        value:function assign(target){
            'use strict';
            if(target===null||target===undefined){
                throw new Error('Cannot convert undefined or null to object') 
            }
            for(var i=1;i<arguments.length;i++){
                const newSource = arguments[i]
                if(newSource!== null || newSource!==undefined){
                    for(let key in newSource){
                        if(Object.hasOwnProperty.call(newSource,key)){
                            target[key]=newSource[key]
                        }
                    }
                }
            }
            return target
        },
        writable: true,
        configurable: true
    })
}

```

### Object.create
方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
```js
Object.create(proto,[,propertiesObject])
```
`proto` 原型对象

`propertiesObject` 可选，如果没有指定为`undefined`，则是要添加到新创建对象的不可枚举（默认）属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数

```js
const o = {}
// 相当于
const o = Object.create(Object.prototype)

function Fun(){}
const fun = new Fun()
// 相当于
const fun = Object.create(Fun.prototype)
```
###### `polyfill`

这个`polyfill`涵盖了主要的应用场景，它创建一个已经选择了原型的新对象，但没有把第二个参数考虑在内

```js
if(!Object.create){
    Object.create = function(proto, propertiesObject){
        if(typeof proto !== "object" || typeof proto !== "function"){
            throw new Error('Object prototype may only be an Object: ' + proto)
        }else if(proto === null){
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }
        if(typeof propertiesObject !== "undefined"){
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        }

        function F() {}
        F.prototype = proto;

        return new F();
    }
}
```
### Object.defineProperty与Object.defineProperties
这两个方法都是定义对象的自有属性，`defineProperty`只能单个属性的定义，而`defineProperties`能批量定义自由属性,
下面主要介绍`defineProperty`

```js
Object.defineProperty(obj,prop,descriptor)
```
`obj`要定义属性的对象

`prop` 对象的属性的名称或`Symbol`

`descriptor` 属性的描述

```js
Object.defineProperties(obj,props)
```
`obj`要定义属性的对象

`props` 属性的描述的集合

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者

###### `configurable`

特性表示对象的属性是否可以被删除，以及除`value`和`writable`特性外的其他特性是否可以被修改。当`configurable`为`true`时，改属性的描述符才能被修改，同时改属性也能从对象上删除

默认值:`false`

###### `enumerable` 是否可枚举，也就是能被`for...in`访问以及能被`Object.keys()`访问
默认值：`false`

###### `value` 属性的值，可以是任何js的有效值
默认值：`undefind`

###### `writable` 表示是否可以写，当为`true`时，上面的value属性才能被赋值运算符赋值
默认值:`false`

###### `get` 属性的`getter`函数，如果没有`getter`，则为`undefined`。
当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值
默认值：`undefined`

###### `set` 属性的`setter`函数，如果没有`setter`，则为`undefined`。

当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
默认值：`undefined`

如果一个描述符不具有value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。也就是value或者writable与get或set不能同时出现

```js
var o = {};

o.a = 1;
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});

Object.defineProperty(o,'a',{get(){return 1}})
// 等同于
Object.defineProperty(o,'a',{
    set:undefined,
    get(){return 1},
    enumerable: false,
    configurable:false,
})
```
属性继承
```js
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1
```
此处b的x也拥有值了，我们可以通过this去绑定一个实例的值
```js
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return this._x;
  },
  set(x) {
    this._x = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(a.x) // 1
console.log(b.x); // undefind 此处还没有个b.x赋值
console.log(Object.getOwnPropertyDescriptors(a))
//{ _x:{ value: 1, writable: true, enumerable: true, configurable: true } }
console.log(Object.getOwnPropertyDescriptors(b))
// {}
console.log(a)
// {_x:1}
console.log(b)
// {}
```

### Object.entries（es6）与Object.keys与Object.values（es6）
`Object.entries`方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于`for-in`循环还会枚举原型链中的属性，`for-in`也不会遍历`Symbol`类型的属性）,不包含`Symbol`的属性。

`Object.keys`返回自有可枚举的key，不包含`Symbol`的属性

`Object.values`返回可枚举的属性的值，不包含`Symbol`的属性
```js
Object.entries(obj)
```
```js
const obj = { a: 5, b: 7, c: 9 , [Symbol('f')]:'2' };

console.log(Object.entries(obj)) // [ [ 'a', 5 ], [ 'b', 7 ], [ 'c', 9 ] ]

console.log(Object.keys(obj)); // [ 'a', 'b', 'c' ]

console.log(Object.values(obj)); // [ 5, 7, 9 ]

```
将Object转Map

```js
const obj = { a: 5, b: 7, c: 9 };
const map = new Map(Object.entries(obj));
console.log(map)
// Map { 'a' => 5, 'b' => 7, 'c' => 9 }
```
<b>注意:</b>在ES5里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在ES2015中，非对象的参数将被强制转换为一个对象。

```js
Object.keys("foo");
// TypeError: "foo" is not an object (ES5 code)

Object.keys("foo");
// ["0", "1", "2"]  (ES2015 code)
```

### Object.fromEntries(ES6-2019)
`Object.fromEntries`方法把键值对列表转换为一个对象

```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// {foo: "bar", baz: 42}
```

### Object.freeze与Object.seal、isFrozen与Object.isSealed

`Object.freeze()`方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()`返回和传入的参数相同的对象。

`Object.seal()`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。

`Object.isFrozen()`方法判断一个对象是否被冻结,返回`Boolearn`类型

`Object.isSealed()`方法判断一个对象是否被密封,返回`Boolearn`类型

冻结的时候冻结对象的基本类型的属性，如果属性值为引用类型，则冻结不上。

### Object.preventExtensions 与 Object.isExtensible
`Object.preventExtensions()`方法让一个对象变的不可扩展，也就是永远不能再添加新的属性

`Object.isExtensible()` 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性


### Object.getOwnPropertyDescriptor与Object.getOwnPropertyDescriptors（es6）
`Object.getOwnPropertyDescriptor()` 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

`Object.getOwnPropertyDescriptors()` 方法用来获取一个对象的所有自身属性的描述符。

```js
Object.getOwnPropertyDescriptor(obj,prop)
```
```js
Object.getOwnPropertyDescriptors(obj)
```
```js
o = { get foo() { return 17; } };
d = Object.getOwnPropertyDescriptor(o, "foo");
e = Object.getOwnPropertyDescriptors(o)
console.log(d)

// { get: [Function: get foo],
//   set: undefined,
//   enumerable: true,
//   configurable: true }

console.log(e)
// { foo:
//    { get: [Function: get foo],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }

```

### Object.getOwnPropertyNames
`Object.getOwnPropertyNames()`方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括`Symbol`值作为名称的属性）组成的数组。

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]
```

### Object.getOwnPropertySymbols
`Object.getOwnPropertySymbols()` 方法返回一个给定对象自身的所有 Symbol 属性的数组。
```js
const obj = {
    'a':'1','b':'3',
    [Symbol('f')]:'4',
}
Object.defineProperty(obj, Symbol('k'), {
    value:'5',
    enumerable: false
})
console.log(Object.getOwnPropertyNames(obj)) // [ 'a', 'b' ]
console.log(Object.getOwnPropertySymbols(obj)) // [ Symbol(f), Symbol(k)  ]
```
```js
const obj = {}
Object.defineProperties(obj, {
    [Symbol('k')]:{
        value:'4',
        enumerable:true,
    },
    [Symbol('f')]:{
        value:'5',
        enumerable:false,
    }
})
console.log(Object.getOwnPropertyNames(obj)) // []
console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(k), Symbol(f) ]
```

### Object.getPrototypeOf（es6）
`Object.getPrototypeOf()`返回指定对象原型的值，也就是`[[prototype]]`的值

```js
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true

var reg = /a/;
Object.getPrototypeOf(reg) === RegExp.prototype; // true
```

注意 
在`ES5`中如果参数不是一个对象类型，将抛出一个TypeError异常。在`ES6`中，参数会被强制转换为一个`Object`
```js
Object.getPrototypeOf('foo');
// TypeError: "foo" is not an object (ES5 code)
Object.getPrototypeOf('foo');
// String.prototype                  (ES2015 code)
```

### Object.is(es6)
`Object.is()` 方法判断两个值是否是相同的值
```js
Object.is(value1, value2);
```
`Object.is()`判断两个值是否相同。如果下列任何一项成立，则两个值相同：

    两个值都是 undefined
    两个值都是 null
    两个值都是 true 或者都是 false
    两个值是由相同个数的字符按照相同的顺序组成的字符串
    两个值指向同一个对象
    两个值都是数字并且
        都是正零 +0
        都是负零 -0
        都是 NaN
        都是除零和 NaN 外的其它同一个数字

这种相等性判断逻辑和传统的 `==` 运算不同，`==` 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 等于 true 的现象），但 Object.is 不会做这种类型转换。

这与 `===` 运算符的判定方式也不一样。`===` 运算符（和`==`运算符）将数字值 `-0` 和 `+0` 视为相等，并认为 `Number.NaN` 不等于 `NaN`

```js
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);         // true
Object.is(foo, bar);         // false

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(0, +0);            // true
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

### Object.prototype.hasOwnProperty
`hasOwnProperty()` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）,和`in`运算符不同，该方法会忽略掉那些从原型链上继承到的属性

```js
obj.hasOwnProperty(prop)
```
```js
o = new Object();
o.hasOwnProperty('prop'); // 返回 false
o.prop = 'exists';
o.hasOwnProperty('prop'); // 返回 true
o.hasOwnProperty('toString');         // 返回 false
o.hasOwnProperty('hasOwnProperty');   // 返回 false
delete o.prop;
o.hasOwnProperty('prop'); // 返回 false
```
思考：为什么`eslint`推荐写法为`Object.prototype.hasOwnProperty.call(obj,key)`?

因为`hasOwnProperty`并非为保留字段属性，防止对象重写`hasOwnProperty`方法
```js
var foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，
// 可以直接使用原型链上真正的 hasOwnProperty 方法
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的hasOwnProperty属性,这种不会创建额外的对象
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```

### Object.prototype.isPrototypeOf
`isPrototypeOf()` 用来判断是否在某一原型链上

```js
prototypeObj.isPrototypeOf(object)
```

```js
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```
### Object.prototype.propertyIsEnumerable
`propertyIsEnumerable()` 方法返回一个布尔值，表示指定的属性是否可枚举。此方法可以确定对象中指定的属性是否可以被 `for...in`循环枚举，但是通过原型链继承的属性除外。如果对象没有指定的属性，则此方法返回`false`

### Object.prototype.toLocaleString
`toLocaleString()`方法返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用
```js
const a = {}
console.log(a.toLocaleString()) // [object Object]
```

### Object.prototype.toString
`toString()` 方法返回一个表示该对象的字符串。每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖，`toString() `返回 `"[object type]"`，其中 `type` 是对象的类型
```js
var o = new Object();
o.toString(); // returns [object Object]
```
使用toString来检测对象类型
```js
const toString = Object.prototype.toString

console.log(toString.call({})) // [object Object]
console.log(toString.call([])) // [object Array]
console.log(toString.call('')) // [object String]
console.log(toString.call(true)) //[object Boolean]
console.log(toString.call(1)) // [object Number]
console.log(toString.call(NaN)) // [object Number]
console.log(toString.call(Symbol('k'))) // [object Symbol]
console.log(toString.call(Promise.resolve())) // [object Promise]
console.log(toString.call(new Date)) //[object Date]
console.log(toString.call(new Map([['a','1'],['b','2']]))) // [object Map]
console.log(toString.call(new Set([1,2]))) // [object Set]
console.log(toString.call(new RegExp(''))) // [object RegExp]
console.log(toString.call(1n)) // [object BigInt] BigInt为ES6-第4阶段
console.log(toString.call(function* helloWorldGenerator() {})) // [object GeneratorFunction]
console.log(toString.call((function* helloWorldGenerator() {})())) // [object Generator]

```

### Object.prototype.valueOf
`valueOf()` 方法返回指定对象的原始值
JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同

对象|	返回值
---|---
Array	 | 返回数组对象本身。
Boolean	 | 布尔值。
Date	 | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。
Function | 函数本身。
Number	 | 数字值。
Object	 | 对象本身。这是默认情况。
String	 | 字符串值
-         | Math 和 Error 对象没有 valueOf 方法。

```js
// Array：返回数组对象本身
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array);   // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
console.log(date.valueOf());   // 1376838719230

// Number：返回数字值
var num =  15.26540;
console.log(num.valueOf());   // 15.2654

// 布尔：返回布尔值true或false
var bool = true;
console.log(bool.valueOf() === bool);   // true

// new一个Boolean对象
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
console.log(newBool.valueOf() == newBool);   // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
console.log(newBool.valueOf() === newBool);   // false

// Function：返回函数本身
function foo(){}
console.log( foo.valueOf() === foo );   // true
var foo2 =  new Function("x", "y", "return x + y;");
console.log( foo2.valueOf() );
/*
ƒ anonymous(x,y
) {
return x + y;
}
*/

// Object：返回对象本身
var obj = {name: "张三", age: 18};
console.log( obj.valueOf() === obj );   // true

// String：返回字符串值
var str = "http://www.xyz.com";
console.log( str.valueOf() === str );   // true

// new一个字符串对象
var str2 = new String("http://www.xyz.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
console.log( str2.valueOf() === str2 );   // false
```

### Object.setPrototypeOf（es6）
`Object.setPrototypeOf()` 方法设置一个指定的对象的原型 ( 即, 内部`[[Prototype]]`属性）到另一个对象或 `null`
```js
Object.setPrototypeOf(obj, prototype)
```
`obj` 要设置的对象
`prototype` 新的原型