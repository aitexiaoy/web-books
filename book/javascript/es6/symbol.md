`symbol` 是一种基本数据类型 （primitive data type）。`Symbol()`函数会返回 symbol 类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的 symbol 注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。

每个从 Symbol()返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。

```js
Symbol([description])
```

`description` 描述字段，为了调试用。可选

```js
a = symbol("a") // a 此时就是一个唯一的
b = symbol("b")

a === b // false

a.toString() // "symbol('a')"

typeof a // "symbol"
```
