### 前言

`Event Loop` 是一个执行模型，在不同的环境有不同的实现

- 浏览器中的EventLoop在[html5规范](https://www.w3.org/TR/html5/webappapis.html#event-loops)中明确定义

- Nodejs中的EventLoop是基于linuv实现的，参考[官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

### 宏队列与微队列

宏对列(macrotask)，也叫tasks 。一些异步任务的回调会依次进入`macro task queue`，等待后续被调用。这些异步任务包括

- setTimeout
- setInterval
- setImmediate (Node调用)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering(浏览器独有)

微队列(microtask) 也叫 jobs。另外一些异步任务的回调会依次进入`micro task queue`，等待后续被调用。这些异步任务包括：

- process.nextTick(node独有)
- Promise
- Object.observe
- MutationObserver 
- queueMicrotask // 推入到微任务队列中


### 浏览器Event Loop

![浏览器event loop](http://file.qiniu.taoacat.com/uPic/20200420-164116-JxNAk8.png)

浏览器执行流程：

1. 执行全局的Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句(如setTimeOut)

2. 全局Script执行完成后，调用栈Stack会清空

3. 从微任务`microtask`中取出位于对首的回调任务，放入Stack执行栈中，执行完后microtask queue 长度减1

4. 继续从`microtask`的队首取出任务，放入到Stack中，依次类推，直到把`microtask queue`中的所有任务都执行完毕。如果在执行过程中遇到新的`microtask`,那么就继续加入对尾。并在这个周期中被调用执行。直到microtask queue中的任务清空了

5. microtask queue 中的所有任务都执行完毕后，此时microtask queue 为空队列，调用栈Stack也为空。

6. 取出宏对列(macrotask)中位于队首的任务，放入Stack中执行。

7. 执行完毕后，调用栈为空

8. 重复 3-7 的步骤

##### 重点：

1. 宏对列一次只从队列中取出一个任务执行，执行完成之后就去执行微队列中的任务。

2. 微任务会被依次取出执行，直到微任务队列为空。当然不能一直再执行微任务，

3. 对于UI rendering 浏览器咨询判断决定，但是只要执行UI rendering，他的节点是在执行完所有的microtask之后，下一个macrotask之前，紧接着执行UI render

测试：

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);
```

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
  
  Promise.resolve().then(() => {
    console.log(6)
  }).then(() => {
    console.log(7)
    
    setTimeout(() => {
      console.log(8)
    }, 0);
  });
})

setTimeout(() => {
  console.log(9);
})

console.log(10);
```

### NodeJS中的Event Loop

nodejs的event loop中，执行宏对列的回调有6个阶段，

![Nodejs中的event loop](http://file.qiniu.taoacat.com/uPic/20200420-181406-9Dk1Js.png)

- `timers`阶段 这个阶段执行setTimeOut和setInterval的callback

- `I/O callback` 执行其他阶段外的callback

- `idle、prepare` 仅node内部使用

- `poll阶段` 获取新的I/O事件，适当条件下node会阻塞在这儿

- `check阶段` 执行setImmediate() 设定的callbacks

- `close callbacks阶段` 执行socket.on('close',...)这些callback

在NodeJs中宏对列任务主要有4个

- Timers Queue
- IO Callbacks Queue
- Check Queue
- Close Callbacks Queue

在浏览器中可以认为只有一个宏对列，所有的macrotask都会被加入到这个宏对列中，但是在Nodejs中，不同的macrotask会被放置在不同的宏对列中

在NodeJs中的微队列任务主要有2个

- `Next Tick Queue` 放置process.nextTick的回调任务
- `Other Micro Queue` 比如Promise

浏览器中也可以认为只有一个microtask queue

nodejs中Ecent Loop流程

1. 执行全局的Script同步代码

2. 执行microtask微任务，先执行所有的`Next Tick Queue`中的所有任务，再执行`Other Micro Queue` 。

3. 开始执行macrotask宏任务，分为6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2

4. Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......

例子：

```js
console.log('start');

setTimeout(() => {          // callback1
  console.log(111);
  setTimeout(() => {        // callback2
    console.log(222);
  }, 0);
  setImmediate(() => {      // callback3
    console.log(333);
  })
  process.nextTick(() => {  // callback4
    console.log(444);  
  })
}, 0);

setImmediate(() => {        // callback5
  console.log(555);
  process.nextTick(() => {  // callback6
    console.log(666);  
  })
})

setTimeout(() => {          // callback7              
  console.log(777);
  process.nextTick(() => {  // callback8
    console.log(888);   
  })
}, 0);

process.nextTick(() => {    // callback9
  console.log(999);  
})

console.log('end');
```

```js
// 正确答案
start
end
999
111
777
444
888
555
333
666
222
```

参考手册 

[带你彻底弄懂Event Loop](https://segmentfault.com/a/1190000016278115)
