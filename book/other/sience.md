#### 下方函数的输出值

```js

function fun(n,o){
  console.log(o);
  return {
    fun: function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0);  // ?
a.fun(1);        // ?        
a.fun(2);        // ?
a.fun(3);        // ?

var b = fun(0).fun(1).fun(2).fun(3);  // ?

var c = fun(0).fun(1);  // ?
c.fun(2);        // ?
c.fun(3);        // ?


```

```html
/*vue*/
<template>
    <el-button @click="click_fn">打开控制台查看输出</el-button>
</template>

<script>
    export default {
        name:'',
        data(){
            return {

            }
        },
        methods:{
            click_fn(){
                function fun(n,o){
                    console.log(o);
                    return {
                        fun: function(m){
                        return fun(m,n);
                        }
                    };
                }

                var a = fun(0);  // ?
                a.fun(1);        // ?        
                a.fun(2);        // ?
                a.fun(3);        // ?

                var b = fun(0).fun(1).fun(2).fun(3);  // ?

                var c = fun(0).fun(1);  // ?
                c.fun(2);        // ?
                c.fun(3);        // ?
            }
        }
    }
</script>
```

##### 求斐波那契数列

 求1,1,2,3,5,8,13,21,34,55,89...中的第 n 项

```js

//方法一
let count2 = 0;
function fn1(n) {
    count2++;
    if (n == 1 || n == 2) {
        return 1;
    }
    return fn1(n - 1) + fn1(n - 2);
}

//方法二
let count = 0;
function fn2(n) {
    let cache = {};
    function _fn(n) {
        if (cache[n]) {
            return cache[n];
        }
        count++;
        if (n == 1 || n == 2) {
            return 1;
        }
        let prev = _fn(n - 1);
        cache[n - 1] = prev;
        let next = _fn(n - 2);
        cache[n - 2] = next;
        return prev + next;
    }
    return _fn(n);
}

//方法三
function fn3(n){
    let last_value=1;
    let last_last_value=1;
    if (n == 1 || n == 2) {
        return 1;
    }
    for(let i=3;i<n;i++){
        let old_last_value=last_value;
        last_value=last_value+last_last_value;
        last_last_value=old_last_value;
    } 
    return last_value+last_last_value;
}

//方法4 尾递归
function fn4 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};
  return fn4 (n - 1, ac2, ac1 + ac2);
}

```

<vuep template="#boqiefeila"></vuep>

<script v-pre type="text/x-template" id="boqiefeila">
    <template>
        <div>
            <h1>求斐波那契数列</h1>
            <p>方法一递归比较耗时，所有不在此执行，请自行执行,打开控制台查看运行时间</p>
            <el-input v-model="input_v" placeholder="输入n项"></el-input>
            <el-button @click="start_click">开始结算</el-button>
            <div>Fn2计算结果:{{fn2_value.toString()}}</div>
            <div>Fn3计算结果:{{fn3_value.toString()}}</div>
            <div>Fn4计算结果:{{fn4_value.toString()}}</div>
        </div>
    </template>
<script>
    module.exports = {
        data() {
            return{
                input_v:'',

                fn2_value:0,
                fn3_value:0,
                fn4_value:0
            }
        },
        methods:{
            start_click(){
                let n=parseInt(this.input_v)
                this.fn2_value = this.fn2(n)
                this.fn3_value = this.fn3(n)
                this.fn4_value = this.fn4(n)
            },
            /***
             * 递归方式
             */
            fn1(n){
                console.time('fn1时间:')
                function fn(n){
                    if (n == 1 || n == 2) {
                        return 1;
                    }
                    return fn(n - 1) + fn(n - 2);
                }
                console.timeEnd('fn1时间:')
            },
            fn2(n){
                console.time('fn2时间:');
                let cache = {};
                function _fn(n) {
                    if (cache[n]) {
                        return cache[n];
                    }
                    if (n == 1 || n == 2) {
                        return 1;
                    }
                    let prev = _fn(n - 1);
                    cache[n - 1] = prev;
                    let next = _fn(n - 2);
                    cache[n - 2] = next;
                    return prev + next;
                }
                let aa=_fn(n);
                console.timeEnd('fn2时间:')
                return aa;
            },
            fn3(n){
                console.time('fn3时间:')
                let last_value=1;
                let last_last_value=1;
                if (n == 1 || n == 2) {
                    return 1;
                }
                for(let i=3;i<n;i++){
                    let old_last_value=last_value;
                    last_value=last_value+last_last_value;
                    last_last_value=old_last_value;
                } 
                console.timeEnd('fn3时间:')
                return last_value+last_last_value;
            },
            fn4(n){
                console.time('fn4时间:')
                function fn (n , ac1 = 1 , ac2 = 1) {
                    if( n <= 1 ) {return ac2};
                    return fn (n - 1, ac2, ac1 + ac2);
                }
                let aa=fn(n);
                console.timeEnd('fn4时间:')
                return aa;
            }
        },
    }
</script>
</script>

#### 日期按指定格式格式化

```js
Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                    date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }
```

#### 数组字符串格式化成三位逗号隔开

123456->123,456

```js
function exchange(num) {
    num += ''; //转成字符串
    if (num.length <= 3) {
        return num;
    }

    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, (v) => {
        console.log(v)
        return v + ',';
    });
    return num;
}
```

#### 求以下的输出
```js
var b={x:4}
function fn2(o){
    this.x=o.x;
}
fn2.prototype={
    init:function(){
        return this.x;
    }
}

var fn3=new fn2({x:5});

console.log(fn3.init());
console.log(fn3.init===fn2.init);
console.log(fn3.init.call(b));
var c=fn3.init;
console.log(c());

```

```js
setTimeout(function(){
    console.log(1)
},0);
new Promise(function(resolve){
    console.log(2);
    for(var i=0;i<10;i++){
        i==9&&resolve();
    }
    console.log(3);
}).then(function(){
    console.log(4);
})
console.log(5);

```

```js
function A(){};
function B(){};
A.prototype={
    fun:function(){

    }
}

var a=new A();
console.log(a.constructor===A);
console.log(A.prototype.constructor===A);
console.log(a.hasOwnProperty('constructor'))
console.log(a instanceof A)


A.prototype=new B();
var b=new A();
console.log(b.constructor===A);
console.log(B.prototype.constructor===A);
console.log(b.constructor.prototype.constructor===A)
console.log(b.hasOwnProperty('constructor'));
console.log(b instanceof A)
console.log(b instanceof B)

```