#### Boolean对象是一个布尔值的对象包装器

```js
const a = new Boolean(false)

!!a === true // 因为此处a是一个值为false的对象,而不是一个fasle的值

a = Boolean(false) === false //true
```

#### 属性

`Boolearn.length` length 属性，值为 1

`Boolean.prototype` Boolean 构造函数的原型对象

#### 方法

`Boolean.prototype.valueOf()` 返回Boolean对象的原始值
