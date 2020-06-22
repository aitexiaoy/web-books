### 对象拷贝

对象的拷贝分为浅拷贝与深拷贝，浅拷贝只能拷贝基本类型，不能拷贝引用类型。比如

```js
const obj = {
    'a':'1',
    'b':{
        'c':'2',
    }
}

const clone= (obj) => Object.assign({},obj)

// 等同于
const clone2 = (obj) => {...obj} // ES6中的扩展运算符

const a = clone(obj)

a.b.c = 3

console.log(obj.b.c) // 3

```
针对对象中的属性为引用类型的，浅拷贝只是将引用类型的指针拷贝给了新对象，新对象中的属性`b`与obj中的属性`b`都还是指向的同一块内存。所有在新对象中针对属性`b`的属性修改，原属性也跟着变了。

接下来就是如何实现一个深拷贝了，针对普通对象，我能可以采用JSON的方法来实现一个深拷贝
```js
const deepClone = function(obj) {
    if (obj) {
        return JSON.parse(JSON.stringify(obj))
    }
    return obj
}
```
但是采用JSON进行实现会有几个问题，
1. 不能拷贝函数
2. 对象的循环指针引用
3. 不能处理`Symbol`类型作为键值

下面为实现的一个`deepClone`例子，思想就是采用递归层层遍历拷贝

```js
function deepClone(obj, cache = [] ){
    // 递归结束条件
    if(obj===null || typeof obj !== "object"){
        return obj
    }

    // 找到是否有循环引用的
    const hit = cache.find(c=> c.ori === obj)
    if(hit){
        return hit.copy
    }

    // 定义初始对象
    const copy = Array.isArray(obj) ? [] : {}

    // 缓存对象
    cache.push({
        ori: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache)
    })

    // 拷贝symbol属性的值
    Object.getOwnPropertySymbols(obj).forEach(symbol=>{
        copy[symbol] = deepClone(obj[symbol], cache)
    })

    return copy

}
```