### 值属性

#### `Infinity` 表示无穷大

```js
+Infinity !== -Infinity // true

+0 === -0 // true

1/+0 === Infinity
1/-0 === -Infinity
```
#### `NaN`
转换数字失败就是一个`NaN`,可以通过`isNaN()` 函数和`Number.isNaN()`进行判断，

`isNaN()` 会将参数通过Number强制转换后进行判断
`Number.isNaN()` 直接判断参数值是否是NaN

还可以利用`NaN!==NaN`来进行判断是否是`NaN`

#### `undefined`
只定义不赋值就是`undefined`,

```js
var a
a === undefined // true
typeof a === "undefined" // true
```

#### `null`

`null`特指对象的值未设置

```js
var a = null
a === null // true
null === undefined // false
null  == undefined // true
!null // true
isNaN(1 + null) // false
isNaN(1 + undefined) // true
typeof null // "object" (因为一些以前的原因而不是'null')，所以不能通过typeof 判断是否为null

Object.prototype.toString.call(null) // "[object Null]"
```
#### `globalThis`
全局对象的this对象

在web中可以通过`window`,`self`,`frames` 获得全局对象。在node环境中采用`global`来获取

```js
Function('return this')()
```

### 函数属性

#### `eval()` 
执行js字符串

#### `isFinite()`

用来判断数组是否是有限数组， `Infinity`，`NaN`,`undefined` 会返回`false`,其他的返回`true`。在内部会支持类型转换

```js
isFinite(Infinity);  // false
isFinite(NaN);       // false
isFinite(-Infinity); // false
isFinite(undefined) // false

isFinite(0);         // true
isFinite(2e64);      // true, 

isFinite(null); // true 在更强壮的Number.isFinite(null)中将会得到false

isFinite("0");   
```

#### `isNaN()`

判断是否是NaN

#### `parseFloat()`

函数解析一个参数（必要时先转换为字符串）并返回一个浮点数。如果给定值不能被转换成数值，则会返回 NaN

parseFloat 转换`BigInt`会丢掉后面的`n`

```js
parseFloat(string)
```

#### `parseInt()`
`parseInt(string, radix)` 将一个字符串` string `转换为` radix `进制的整数，` radix `为介于`2-36`之间的数

如果` radix `是` undefined`、`0`或未指定的，JavaScript会假定以下情况：

如果输入的 `string`以 "0x"或 "0X"（一个0，后面是小写或大写的X）开头，那么radix被假定为`16`，字符串的其余部分被解析为十六进制数。
如果输入的` string`以 "0"（0）开头， radix被假定为8（八进制）或10（十进制）。具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用` parseInt `时，一定要指定一个` radix`。
如果输入的` string `以任何其他值开头，`radix` 是` 10 `(十进制)。
如果第一个字符不能转换为数字，parseInt会返回` NaN`

`radix` 超出范围将返回`NaN`

#### `enCodeURI()`和`deCodeURI()`
转义与解码uri

#### `encodeURIComponent()`和`deCodeURIComponent()`
转义与解码uri

```js
var set1 = ";,/?:@&=+$";  // 保留字符
var set2 = "-_.!~*'()";   // 不转义字符
var set3 = "#";           // 数字标志
var set4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (the space gets encoded as %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)
```

### 基本对象

#### [Object](/book/javascript/js基础/js-object.md)

#### [Function](/book/javascript/js基础/js-function.md)

#### [Function](/book/javascript/js基础/js-boolearn.md)

#### [Symbol](/book/javascript/es6/symbol.md)


### 数字和日期

#### Number

`JavaScript` 的` Number `对象是经过封装的能让你处理数字值的对象。`Number `对象由 `Number() `构造器创建，类型为双精度IEEE 754 64位浮点类型。

```js
new Number(value); 
var a = new Number('123'); // a === 123 is false ,newBumber返回的也是一个对象
var b = Number('123'); // b === 123 is true
a instanceof Number; // is true
b instanceof Number; // is false

```

##### 属性
- `Number.EPSILON` 两个可表示(representable)数之间的最小间隔。

如何判断 0.1 + 0.2 === 0.3 ?

```js
x = 0.2;
y = 0.3;
z = 0.1;
equal = (Math.abs(x - y + z) < Number.EPSILON);
```

- `Number.MAX_SAFE_INTEGER` JavaScript中最大的安全整数 (<span>2</span><sup>53</sup> - 1)

- `Number.MAX_VALUE` 能表示的最大正数。最小的负数是 `-MAX_VALUE`

- `Number.MIN_SAFE_INTEGER` JavaScript 中最小的安全整数 (-(<span>2</span><sup>53</sup> - 1))

- `Number.MIN_VALUE` 能表示的最小正数即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE。

- `Number.NaN` 特殊的“非数字”值

- `Number.NEGATIVE_INFINITY` 特殊的负无穷大值，在溢出时返回该值。

- `Number.POSITIVE_INFINITY` 特殊的正无穷大值，在溢出时返回该值。

##### 方法

`Number.isNaN()` 确定传递的值是否是 `NaN` 和全局的`isNaN`有些不同

`Number.isFinite()` 确定传递的值类型及本身是否是有限数

`Number.isInteger()` 确定传递的值类型是“number”，且是整数

`Number.isSafeInteger()` 确定传递的值是否为安全整数 ( -(<span>2</span><sup>53</sup> - 1) 至 <span>2</span><sup>53</sup> - 1之间)

`Number.parseFloat()` 和全局的`parseFloat()` 一样

`Number.parseInt()` 和全局的`parseInt()` 一样

为什么Number的安全数在 -(<span>2</span><sup>53</sup> - 1) 至 <span>2</span><sup>53</sup> - 1之间?

------后面补-------

#### BigInt

`BigInt` 是一种内置对象，它提供了一种方法来表示大于 <span>2</span><sup>53</sup> - 1 的整数。这原本是Javascript中可以用 Number 表示的最大数字。`BigInt`可以表示任意大的整数。可以用在一个整数字面量后面加` n `的方式定义一个 `BigInt` ，如：10n，或者调用函数`BigInt()`

#### Math

[Math](/book/javascript/js基础/js-math.md)

#### 正则

[正则](/book/javascript/js基础/js-regexp.md)