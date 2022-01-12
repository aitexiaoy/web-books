#### 1. apply

```js
func.apply(thisArg, [argsArray])
```

##### 参数

`thisArg` 必填，在 func 函数运行时使用的 this 值，在非严格模式下 thisArg 为 null 或者 undefined 时会自动替换为

`argsArray`选填，一个数组或者类数组对象。会将数组元素将作为单独的参数传给`func`函数。如果只为`null`或者`undefined`则表示不需要任何参数

##### 返回值

调用有指定 this 值和参数的函数的结果

例如 `max`函数，max 函数返回一组参数中的最大值

```js
Math.max(1, 2, 3)
```

用 apply 从写一下求数组中的最大值

```js
Math.max.apply(null, [1, 2, 3])
```

当然也可以用 ES6 的扩展运算符直接解构

```js
Math.max(...[1, 2, 3])
```

##### 作用

当调用一个函数时，为其指定一个 this 对象，this 指向当前对象，可以是用 apply 去动态的指定 this 所在的对象，相当于在另一个对象这继承了原对象中的这个方法，而不用再新对象中重复写该方法。

当调用 apply 方法对函数传参的过程中可能会超出 JavaScript 引擎的参数长度限制，这个临界值是根据不同的 JavaScript 引擎而定的（JavaScript 核心中已经做了硬编码 参数个数限制在 65536），因为这个限制（实际上也是任何用到超大栈空间的行为的自然表现）是未指定的. 有些引擎会抛出异常。更糟糕的是其他引擎会直接限制传入到方法的参数个数，导致参数丢失。举个例子：如果某个引擎限制了方法参数最多为 4 个（实际真正的参数个数限制当然要高得多了, 这里只是打个比方）, 上面的代码中, 真正通过 apply 传到目标方法中的参数为 5, 6, 2, 3 而不是完整的数组。如果参数过长，建议对参数进行切割，如：

```js
function minOfArray(arr) {
    var min = Infinity
    var QUANTUM = 32768

    for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
        var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)))
        min = Math.min(submin, min)
    }

    return min
}

var min = minOfArray([5, 6, 2, 3, 7])
```

#### 2. call

`call`与 apply 类似，只是输入的参数不同

```js
function.call(thisArg, arg1, arg2, ...)
```

##### 使用 call 方法调用父构造器的函数

```js
function Man(name) {
    this.name = name
}

function Women(name) {
    Man.call(this, name)
    this.sex = "女人"
}

var persion = new Women("liqin")
persion.name // liqin
```

如果 call 没有指定第一个参数，调用 call 的函数中的 this 将绑定为全局对象，在严格模式下为`undefined`

#### 3. bind

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

```js
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

`thisArg` 目标 this 的值，如果使用 new 运算符构造绑定函数，则忽略该值。 `arg1, arg2, ...` 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

```js
const Man = {
    name: "liqin",
    getName: function () {
        return this.name
    },
}

const getName = Man.getName
getName() // 此处的this为windows(非严格模式下)

const getNameThis = getName.bind(Man)
getNameThis() // 'liqin'
```

`bind()` 的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面如：

```js
function addArguments(arg1, arg2) {
    return arg1 + arg2
}

addArguments(1, 2) // 3

var newAdd = addArguments.bind(null, 37)
newAdd(1, 2, 3) //38其余参数会被忽略
```

##### bind polyfill

```js
Function.prototype.bind = function () {
    const thatFun = this
    const that = arguments[0]
    const args = Array.prototype.slice.call(arguments, 1)
    if (typeof thatFun !== "function") {
        throw new TypeError("我错了😞")
    }
    return function () {
        return thatFun.apply(that, args.concat(Array.prototype.slice.call(arguments)))
    }
}
```
