接下来看`new`操作符都发生了什么

1. 创建一个新的对象
2. 将构造函数的作用域赋给新的对象(将this指向到新的对象上)
3. 执行构造函数中的代码（为这个新的对象添加属性与方法）
4. 返回新的对象

```js
function createNew(Con, ...args){
    let obj = {}
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, args)
    
    return result instanceof Object ? result : obj
}
```

```js
function createNew(Con,...args){
    let obj = Object.create(Con.prototype)
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}
```