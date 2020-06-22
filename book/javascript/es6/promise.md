### 如何实现一个Promise

```js
class MyPromise {

    constructor(executor){
        this.STATUS={
            PEDDING:'PEDDING',
            RESOLVED:'RESOLVED',
            REJECTED:'REJECTED'
        }
        this.value = null
        this.error = null
        this.status = this.STATUS.PEDDING
        this.resolveFn = []
        this.rejectFn = []

        const resolve = (value) => {
            if(this.status === this.STATUS.PEDDING){
                this.status = this.STATUS.RESOLVED
                this.value = value
                this.resolveFn.forEach(fn=>fn(this.value))
            }
        }   

        const reject = (error) => {
            if(this.status === this.STATUS.PEDDING){
                this.status = this.STATUS.REJECTED
                this.error = error
                this.rejectFn.forEach(fn=>fn(this.error))
            }
        }

        try {
            executor(resolve,reject)
        } catch(err){
            reject(err)
        }
    }

    then(onResolved, onRejected){
        onResolved = typeof onResolved === 'function' ? onResolved: value => value
        onRejected = typeof onRejected === 'function' ? onRejected: error => { throw error }

        const STATUS = this.STATUS

        const resolvePromise = (promise, x, resolve, reject) => {
            if(promise === x){
                return reject(new TypeError('不能重复引用'))
            }
            let called
            if(x!==null && (typeof x === 'object' || typeof x === 'function')){
                try {
                    let then = x.then
                    if(typeof then === 'function'){
                        then.call(x,y=>{
                            if(called){
                                return
                            }
                            called = true
                            resolvePromise(promise, y, resolve, reject)
                        }, error=>{
                            if(called){
                                return
                            }
                            called = true
                            reject && reject(error)
                        })
                    }else{
                        resolve(x)
                    }
                }catch(e){
                    if(called){ return }
                    called = true
                    reject(e)
                }
            } else {
                resolve(x)
            }
        }

        const promise2 = new MyPromise((resolve,reject) => {

            if(this.status === STATUS.PEDDING){
                this.resolveFn.push((value)=>{
                    let x = onResolved(value)
                    // 通过queueMicrotask添加微任务
                    queueMicrotask(()=>{
                        resolvePromise(promise2, x, resolve, reject)
                    })
                })
                this.rejectFn.push((error)=>{
                    let x = onRejected(error)
                     queueMicrotask(()=>{
                        resolvePromise(promise2, x, resolve, reject)
                    })
                })
            }

            if(this.status === STATUS.RESOLVED){
                let x = onResolved(this.value)
                queueMicrotask(()=>{
                    resolvePromise(promise2, x, resolve, reject)
                })
            }

            if(this.status === STATUS.REJECTED){
                let x = onRejected(this.error)
                queueMicrotask(()=>{
                    resolvePromise(promise2, x, resolve, reject)
                })
            }

        })

        return promise2
    }

    catch(){
        return this.then(null,reject)
    }

    finally(cb){
        return this.then(cb,cb)
    }

    resolve(val){
        return new MyPromise((resolve, reject)=>{
            resolve(val)
        })
    }

    reject(err){
        return new MyPromise((resolve, reject)=>{
            reject(err)
        })
    }

    // 全部成功返回resolve，有一个失败返回reject
    all(promiseList = []){
        return new MyPromise((resolve, reject)=>{
            let result = []
            let index = 0
            promiseList.forEach((promise,i) =>{
                promise().then((result)=>{
                    result[i] = result
                    if(++index === promiseList.length){
                        resolve(result)
                    }
                }).catch((err)=>{
                    reject(err)
                })
            })
        })
    }

    // 返回最早状态变化的结果
    race(promiseList = []){
        return new MyPromise((resolve, reject)=>{
            promiseList.forEach((promise)=>{
                promise().then(resole, reject)
            })
        })
    }

    // 都返回
    allSettled(promiseList = []){
        return new MyPromise((resolve)=>{
            let result = []
            let index = 0
            promiseList.forEach((promise,i) =>{
                promise().finally((result)=>{
                    result[i] = result
                    if(++index === promiseList.length){
                        resolve(result)
                    }
                })
            })
        })
    }
}
```

实现方法二
```js
  // 判断变量否为function
  const isFunction = variable => typeof variable === 'function'
  // 定义Promise的三种状态常量
  const PENDING = 'PENDING'
  const FULFILLED = 'FULFILLED'
  const REJECTED = 'REJECTED'

  class MyPromise {
    constructor (handle) {
      if (!isFunction(handle)) {
        throw new Error('MyPromise must accept a function as a parameter')
      }
      // 添加状态
      this._status = PENDING
      // 添加状态
      this._value = undefined
      // 添加成功回调函数队列
      this._fulfilledQueues = []
      // 添加失败回调函数队列
      this._rejectedQueues = []
      // 执行handle
      try {
        handle(this._resolve.bind(this), this._reject.bind(this)) 
      } catch (err) {
        this._reject(err)
      }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
      const run = () => {
        if (this._status !== PENDING) return
        this._status = FULFILLED
        // 依次执行成功队列中的函数，并清空队列
        const runFulfilled = (value) => {
          let cb;
          while (cb = this._fulfilledQueues.shift()) {
            cb(value)
          }
        }
        // 依次执行失败队列中的函数，并清空队列
        const runRejected = (error) => {
          let cb;
          while (cb = this._rejectedQueues.shift()) {
            cb(error)
          }
        }
        /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
        if (val instanceof MyPromise) {
          val.then(value => {
            this._value = value
            runFulfilled(value)
          }, err => {
            this._value = err
            runRejected(err)
          })
        } else {
          this._value = val
          runFulfilled(val)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject (err) { 
      if (this._status !== PENDING) return
      // 依次执行失败队列中的函数，并清空队列
      const run = () => {
        this._status = REJECTED
        this._value = err
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(err)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加then方法
    then (onFulfilled, onRejected) {
      const { _value, _status } = this
      // 返回一个新的Promise对象
      return new MyPromise((onFulfilledNext, onRejectedNext) => {
        // 封装一个成功时执行的函数
        let fulfilled = value => {
          try {
            if (!isFunction(onFulfilled)) {
              onFulfilledNext(value)
            } else {
              let res =  onFulfilled(value);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        // 封装一个失败时执行的函数
        let rejected = error => {
          try {
            if (!isFunction(onRejected)) {
              onRejectedNext(error)
            } else {
                let res = onRejected(error);
                if (res instanceof MyPromise) {
                  // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                  res.then(onFulfilledNext, onRejectedNext)
                } else {
                  //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                  onFulfilledNext(res)
                }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        switch (_status) {
          // 当状态为pending时，将then方法回调函数加入执行队列等待执行
          case PENDING:
            this._fulfilledQueues.push(fulfilled)
            this._rejectedQueues.push(rejected)
            break
          // 当状态已经改变时，立即执行对应的回调函数
          case FULFILLED:
            fulfilled(_value)
            break
          case REJECTED:
            rejected(_value)
            break
        }
      })
    }
    // 添加catch方法
    catch (onRejected) {
      return this.then(undefined, onRejected)
    }
    // 添加静态resolve方法
    static resolve (value) {
      // 如果参数是MyPromise实例，直接返回这个实例
      if (value instanceof MyPromise) return value
      return new MyPromise(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject (value) {
      return new MyPromise((resolve ,reject) => reject(value))
    }
    // 添加静态all方法
    static all (list) {
      return new MyPromise((resolve, reject) => {
        /**
         * 返回值的集合
         */
        let values = []
        let count = 0
        for (let [i, p] of list.entries()) {
          // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
          this.resolve(p).then(res => {
            values[i] = res
            count++
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values)
          }, err => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err)
          })
        }
      })
    }
    // 添加静态race方法
    static race (list) {
      return new MyPromise((resolve, reject) => {
        for (let p of list) {
          // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
          this.resolve(p).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        }
      })
    }
    finally (cb) {
      return this.then(
        value  => MyPromise.resolve(cb()).then(() => value),
        reason => MyPromise.resolve(cb()).then(() => { throw reason })
      );
    }
  }
```

参考文档
[30分钟，带你实现一个符合规范的 Promise（巨详细）](https://juejin.im/post/5dc0386fe51d4529ed29266b?utm_source=gold_browser_extension#heading-34)

[在 JavaScript 中通过 queueMicrotask() 使用微任务](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)