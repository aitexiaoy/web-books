#### Array.prototype.reduce

对数组进行迭代器计算

polyfill

```js

Array.prototype.reduce = function (callback,initialValue){
    const _this = this ;
    if(typeof callback !== 'function'){
        throw new TypeError('参数必须有个函数')
    }

    if(_this === null && !Array.isArray(_this)){
        throw new TypeError('方法必须用在数组调用上')
    }

    let value // 初始值
    let index = 0 // 索引
    let length = _this.length

    if(initialValue){
        value = initialValue
    }
    else{
        if(_this[0] !== void 0){
            value = _this[index++]
        }
        else{
             throw new TypeError('数组不能为空')
        }
    }

    while(index < length){
        value = callback(value, _this[index], index, _this)
        index++
    }

    return value
}

```