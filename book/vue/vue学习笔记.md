# Vue学习笔记

#### 一、入门
##### 1. 创建一个Vue实例

```js
var vm=new Vue({
//选项
})
new Vue({
    el:"#app",
    data:{
        mes:"hellow Vue.js"
    },
    created:funstion()
    {
        console.log("实例钩子函数，被创建的时候执行");
    }
})
```

##### 2. 数据绑定两种方法

```js
//1.大括号Mustache语法
<p>{{mes}}</p>

//2.采用v-html
<p v-html="mes"></P>
```
##### 3. vue mustache支持表达式
```js
    {{number=1}}
    {{OK?'yes':'no'}}
    {{message.split('').reverse().join('')}}
    <div v-bind:id="'list-'+id"></div>
```
##### 4. Vue的指令 `v-`
指令都以v-为前缀
```js
 <p v-if="seen">now you see me</p>
 <a v-bind:href="url"></a>
 <a v-on:click="doSomething">
```
##### 5. 修饰符

```js
 //指令后加“.”加修饰符，下语句表示v-on事件之后调用
 event.preventDefault():
 <form v-on:submit.prevent="onSubmit"></form>
```
##### 6. 过滤器
过滤器可以用在`mustache`插值和`v-bind`表达式 
```js
{{message|capitalize}}
```
```js
 <div v-bind:id="rawId|formatId"></div>
 new Vue({
     //...
     filter:{
         capitalize:function(value){
             if(!value)
                return ""
            value=value.toString()
            return value.charAt(0).toUpperCase()+value.slice(1);
         }
     }
 })
```
过滤器可以串联

```js
 {{message|filterA|filterB}}
```

过滤器可以是函数
```js
 {{message|filterA('arg1',arg2)}}
```
##### 7. 缩写
```js
 //v-bind 缩写
 <a v-bind:href="url"></a>
 <a :href="url"></a>
 //v-on 缩写
 <a v-on:click="doSomething"></a>
 <a @click='doSomethis'></a>
```
##### 8. 计算属性`computed`
```js
<div id="example">
<p>{{message}}</p>
<p>{{reversedMessage}}</p>
</div>

var vm=new Vue({
    el:"#example",
    data:{
        message:'hello'
    },
    //计算属性
    computed:{
        reversedMessage:function(){
            return this.message.split('').reverse().join('');
        }
    }
})

//也可以采用methods实现计算
<p>{{reversedMessage()}}</p>
methods:{
    receversedMessage:function(){
        reutrn this.message.split("").reverse().join('');
    }
}
//计算属性与methods，计算属性会将计算值缓存下来，而methods每次渲染都会重新计算。
<p>{{fallname}}</P>
new Vue({
  el:"#app",
  data:{
      fistName:'Foo',
      lastName:"bel",
  }
  computed:{
      fullname:{
         get:function(){
              return this.fistName+this.lastName;
          }
         set:function(newValue){
             this.name=newValue;
         }
      }
  }
})

```
##### 9. 观察`watchers`属性
```js
var watchers=new Vue({
    el:"#watch-example",
    data:{
        question:"",
        answer:"I cannot..."
    },
    watch:{
        question:function(newQuestion){
            //console.log(this.question);
            //this.answer="waiting for...";
            //this.answer=this.question;
            //this.getAnster();
            this.getAnstermy();
        }
    },
    methods:{
        getAnster: _.debounce(
            function(){
                var vm=this;
                if(this.question.indexOf('?')===-1){
                    vm.answer="11111";
                    return;
                }
                vm.answer="Thinking...";
                axios.get('https://yesno.wtf/api').then(
                    function(response){
                        vm.answer= _.capitalize(response.data.answer)
                    }).catch(function(error){
                    vm.answer="error could not reach the API:"+error;
                })
            },500
        ),
        getAnstermy: _.debounce(
            function(){
                this.answer=this.question;
            }
            ,1)
    }
});
```

##### 10. class与style绑定
```js
<div v-bind:class="{active:isActive}"></div>
```
##### 11. 条件渲染
```js
<div id="vif">
<h1 v-if="ok">yes</h1>
<h1 v-else>no</h1>
</div>
//条件判断
var vif = new Vue({
    el: "#vif",
    data: {
        ok: true
    }
});
```
##### 12. v-show
```js
var vshow=new Vue({
    el:"#vshow",
    data:{
        ok:0,
    }
})
<div id="vshow" v-show="ok">vshow_is_ok</div>
```

##### 13.列表渲染
```js
<ul id="vfor">
    <li v-for="a in as" :key="a" >
        {{a.mes}}
    </li>
</ul>

var vfor = new Vue({
    el: "#vfor",
    data: {
        as: [
            {mes: 1},
            {mes: 2},
            {mes: 3}
        ]
    }
});

//还可以
<li v-for=“{item,index} in items :key="item" >
{{parentmessage}}-{{index}}-{{item.message}}

```
也可以采用`of`代替`in`

##### 14. 事件处理器`v-on`
```js
//事件修饰符
.stop // 阻止事件冒泡
.prevent // 阻止默认事件
.capture //添加事件时采用事件捕获模式
.self // 只当事件在该元素本身（而不是子元素）触发时触发回调
.once // 点击事件将只会触发一次
//按键事件修饰器
```
##### 15. 表单动态绑定`v-model`

```js
v-model
```
##### 16. 组件
```js
//全局注册
Vue.component(tagName,options);
Vue.coponent('my-component',{
    //
})

//局部注册
new Vue({
    //...
    components:{
        'my-component':Child
    }
})
// is属性
```
 注册全局组件

1. 导入名为 `fbDialog` 的vue组件
2. 调用 
```js
fbDialog.install=function(Vue){
    Vue.component(fbDialog.name,fbDialog);
}
```
3. 在`main.js`中使用 `Vue.user(fbDialog)`;


##### 17. Vue 插槽
`$slots` 对象，可以判断是否有某个插槽
```js
<div v-if="$slots.footer">
     <slot name="footer"></slot>
</div>
<div v-else></div>
```
`slot`进行特殊内容的分发
```js
// 父亲
<div slot="editbutton">编辑</div>
// 儿子
<slot slot="editbutton" name="editbutton"></slot>
// 孙子
<slot name="editbutton"></slot>
```
作用域插槽 `Scoped slot` 可以利用插槽传递参数
```js
// 父组件
<div scoped-slot="data">{{data}}</div>
// 子组件
<slot data="editbutton"></slot>
```

##### 18. 混入 `mixins` 
使c.vue中含有A,B的方法生命周期函数也会合并，同名函数生效为c.vue中的函数
```js
// c.vue
import A from 'a.vue'
import B from 'b.vue'
mixins[A,B]
```

#### vue实际开发常见问题收集

##### 解决浏览器不支持promise的Bug

1. 安装 `babel-polyfill` 。 babel-polyfill可以模拟ES6使用的环境，可以使用ES6的所有新方法

```sh
npm install --save babel-polyfill
```
2. 在`webpack.config.js`文件中，使用

```js
module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  }
};
```
##### VUE 路由按需加载
```js
const name=r=>require.ensure([],()=>r(require(`${path}`)),`${groupname}`)
```

##### 解决vue-cli vuex requires a Promise polyfill in this browser 在IE浏览器下的问题

`vue-cli` 版本 `2.9`，`webpack` 版 `3.11`
###### 参照网上解决办法：
1. 安装 `npm install babel-polyfill --save`
2. 引入`babel-polyfill`

###### 引入babel-polyfill有这几种方法

1. 在main.js中引入 
`import 'babel-polyfill'`
网上说可以通过 `require('babel-polyfill')`的方式引入，我测试这种方法不行。

2. 更改 `webpack.base.conf.js` 文件中
```js
entry: {
     app: ["babel-polyfill", "./src/main.js"] 
  },
```
或者
3. 更改 `webpack.base.conf.js` 文件
```js
entry: {
    app: ['./node_modules/babel-polyfill/dist/polyfill.js','./src/main.js']
  },
```
因为我拥有2个入口文件，2个文件分别采用这种方式引入。采用方式3会报错，报不能重复require。单入口文件没有问题，注意引入的文件路径，为[./] 
第3中方法测试了单入口文件，有用。2个入口文件没有测试
 
项目中大量的采用了element-ui的组件，部分组件使用方式是将element-ui组件中的代码拷贝出来经过一些样式或逻辑的修改注册成项目的全局组件。在element-ui的组件中还引入了一些依赖工具 比如

```js
import from 'element-ui/src/utils/util'
```
这种在IE下就会报缺少：号或者报语法错误，目前还不清楚这是为什么（猜测可能是包的重复引入什么的），但是我的解决办法是将这些依赖的工具代码也拷贝到项目中，引入的时候通过相对文件路径进行引用。

```js
import from '../../element/utils/dom'
```


##### 解决vue-router 通过import引入文件进行路由懒加载报错的问题，
1. 安装 `npm install babel-preset-stage-2 --save`
2. 在.babelrc文件中添加 `stage-2` 

```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}
```

##### 在线资源整理

###### 1. [VUE2.0 route 中文文档](https://router.vuejs.org/zh-cn/api/router-link.html)
###### 2. [vue组件之prop[转]](http://www.jianshu.com/p/7b8a2c766c13)
###### 3. [vscode 插件推荐 - 献给所有前端工程师](https://segmentfault.com/a/1190000006697219)
###### 4. [vue.js的devtools安装](http://www.cnblogs.com/lolDragon/p/6268345.html)
###### 5. [一起玩转Vue-resource](http://www.jianshu.com/p/3ce2bd36596e)
###### 6. [VUE表单验证插件Vee-validate example](https://baianat.github.io/vee-validate/)
###### 7. [Axios 中文说明](https://www.kancloud.cn/yunye/axios/234845)
###### 8. [VUE-日期选择插件 vue-calendr](https://github.com/jinzhe/vue-calendar)
###### 9. [VUE 高德地图插件 vue-amap](https://github.com/ElemeFE/vue-amap#readme)
###### 10.[移动端最好用的的筛选器组件 better-picker](https://www.npmjs.com/package/better-picker)
###### 11. [icon合成雪碧图插件 webpack-spritesmith](https://github.com/mixtur/webpack-spritesmith)
###### 12. [vue插件 vue-meta SEO工具](https://github.com/nuxt/vue-meta)
