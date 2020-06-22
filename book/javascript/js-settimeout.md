### setTimeout()

`setTimeout()`为一个延时的定时器

##### 用法
```js
var timeoutID = setTimeout(code[, delay]);
```

思考一个问题

```js
    setTimeout(function(){
        console.log(1);
    }, 0);
    console.log(2);
```

```js
    setTimeout(function(){
        console.log(0)
    },2);
    setTimeout(function(){
        console.log(1)
    },0);
```

```js
    var startTime = +new Date();
    setTimeout(function(){
        console.log(1);
    }, 0);
    while((+new Date() - startTime) < (1000 * 1)){
        // console.log('...');
    }
    console.log(2)
```

> delay 

延迟的毫秒数 (一秒等于1000毫秒)，函数的调用会在该延迟之后发生。如果省略该参数，delay取默认值0，意味着“马上”执行，或者尽快执行。不管是哪种情况，实际的延迟时间可能会比期待的(delay毫秒数) 值长

可以理解为`delay`ms后将code加入到执行队列中。

根据HTML5 spec 中精确的数值，delay延迟时间大于等于4ms，即便你把delay设为0

在 Chrome中运行
```js
console.time();
setTimeout(function(){
    console.timeEnd();
    console.log(1)
});
```
运行时间:    sdefault: 1.37109375ms

```js
console.time();
setTimeout(function(){
    console.timeEnd();
    console.log(1)
},1);
```
运行时间:     default: 1.395751953125ms

```js
console.time();
setTimeout(function(){
    console.timeEnd();
    console.log(1)
},4);
```
运行时间:     default: 4.799072265625ms


[参考地址 setTimeout() MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#Reasons_for_delays_longer_than_specified)