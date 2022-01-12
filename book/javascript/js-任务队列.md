### 前言

`Event Loop` 是一个执行模型，在不同的环境有不同的实现

-   浏览器中的 EventLoop 在[html5 规范](https://www.w3.org/TR/html5/webappapis.html#event-loops)中明确定义

-   Nodejs 中的 EventLoop 是基于 linuv 实现的，参考[官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

### 宏队列与微队列

宏对列(macrotask)，也叫 tasks 。一些异步任务的回调会依次进入`macro task queue`，等待后续被调用。这些异步任务包括

-   setTimeout
-   setInterval
-   setImmediate (Node 调用)
-   requestAnimationFrame (浏览器独有)
-   I/O
-   UI rendering(浏览器独有)

微队列(microtask) 也叫 jobs。另外一些异步任务的回调会依次进入`micro task queue`，等待后续被调用。这些异步任务包括：

-   process.nextTick(node 独有)
-   Promise
-   Object.observe
-   MutationObserver
-   queueMicrotask // 推入到微任务队列中

### 浏览器 Event Loop

![浏览器event loop](http://file.qiniu.taoacat.com/uPic/20200420-164116-JxNAk8.png)

浏览器执行流程：

1. 执行全局的 Script 同步代码，这些同步代码有一些是同步语句，有一些是异步语句(如 setTimeOut)

2. 全局 Script 执行完成后，调用栈 Stack 会清空

3. 从微任务`microtask`中取出位于对首的回调任务，放入 Stack 执行栈中，执行完后 microtask queue 长度减 1

4. 继续从`microtask`的队首取出任务，放入到 Stack 中，依次类推，直到把`microtask queue`中的所有任务都执行完毕。如果在执行过程中遇到新的`microtask`,那么就继续加入对尾。并在这个周期中被调用执行。直到 microtask queue 中的任务清空了

5. microtask queue 中的所有任务都执行完毕后，此时 microtask queue 为空队列，调用栈 Stack 也为空。

6. 取出宏对列(macrotask)中位于队首的任务，放入 Stack 中执行。

7. 执行完毕后，调用栈为空

8. 重复 3-7 的步骤

##### 重点：

1. 宏对列一次只从队列中取出一个任务执行，执行完成之后就去执行微队列中的任务。

2. 微任务会被依次取出执行，直到微任务队列为空。当然不能一直再执行微任务，

3. 对于 UI rendering 浏览器咨询判断决定，但是只要执行 UI rendering，他的节点是在执行完所有的 microtask 之后，下一个 macrotask 之前，紧接着执行 UI render

测试：

```js
console.log(1)

setTimeout(() => {
    console.log(2)
    Promise.resolve().then(() => {
        console.log(3)
    })
})

new Promise((resolve, reject) => {
    console.log(4)
    resolve(5)
}).then((data) => {
    console.log(data)
})

setTimeout(() => {
    console.log(6)
})

console.log(7)
```

```js
console.log(1)

setTimeout(() => {
    console.log(2)
    Promise.resolve().then(() => {
        console.log(3)
    })
})

new Promise((resolve, reject) => {
    console.log(4)
    resolve(5)
}).then((data) => {
    console.log(data)

    Promise.resolve()
        .then(() => {
            console.log(6)
        })
        .then(() => {
            console.log(7)

            setTimeout(() => {
                console.log(8)
            }, 0)
        })
})

setTimeout(() => {
    console.log(9)
})

console.log(10)

// 1 4 10 5 6 7 2 3 9 8
```


### NodeJS 中的 Event Loop

nodejs 的 event loop 中，执行宏对列的回调有 6 个阶段，

![Nodejs中的event loop](http://file.qiniu.taoacat.com/uPic/20200420-181406-9Dk1Js.png)

-   `timers`阶段 这个阶段执行 setTimeOut 和 setInterval 的 callback

-   `I/O callback` 执行其他阶段外的 callback

-   `idle、prepare` 仅 node 内部使用

-   `poll阶段` 获取新的 I/O 事件，适当条件下 node 会阻塞在这儿

-   `check阶段` 执行 setImmediate() 设定的 callbacks

-   `close callbacks阶段` 执行 socket.on('close',...)这些 callback

在 NodeJs 中宏对列任务主要有 4 个

-   Timers Queue
-   IO Callbacks Queue
-   Check Queue
-   Close Callbacks Queue

在浏览器中可以认为只有一个宏对列，所有的 macrotask 都会被加入到这个宏对列中，但是在 Nodejs 中，不同的 macrotask 会被放置在不同的宏对列中

在 NodeJs 中的微队列任务主要有 2 个

-   `Next Tick Queue` 放置 process.nextTick 的回调任务
-   `Other Micro Queue` 比如 Promise

浏览器中也可以认为只有一个 microtask queue

nodejs 中 Ecent Loop 流程

1. 执行全局的 Script 同步代码

2. 执行 microtask 微任务，先执行所有的`Next Tick Queue`中的所有任务，再执行`Other Micro Queue` 。

3. 开始执行 macrotask 宏任务，分为 6 个阶段，从第 1 个阶段开始执行相应每一个阶段 macrotask 中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的 Event Loop 中是只取宏队列的第一个任务出来执行，每一个阶段的 macrotask 任务执行完毕后，开始执行微任务，也就是步骤 2

4. Timers Queue -> 步骤 2 -> I/O Queue -> 步骤 2 -> Check Queue -> 步骤 2 -> Close Callback Queue -> 步骤 2 -> Timers Queue ......

例子：

```js
console.log("start")

setTimeout(() => {
    // callback1
    console.log(111)
    setTimeout(() => {
        // callback2
        console.log(222)
    }, 0)
    setImmediate(() => {
        // callback3
        console.log(333)
    })
    process.nextTick(() => {
        // callback4
        console.log(444)
    })
}, 0)

setImmediate(() => {
    // callback5
    console.log(555)
    process.nextTick(() => {
        // callback6
        console.log(666)
    })
})

setTimeout(() => {
    // callback7
    console.log(777)
    process.nextTick(() => {
        // callback8
        console.log(888)
    })
}, 0)

process.nextTick(() => {
    // callback9
    console.log(999)
})

console.log("end")
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

[带你彻底弄懂 Event Loop](https://segmentfault.com/a/1190000016278115)
