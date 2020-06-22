# JavaScript高级程序指南读书笔记

## 第三章 基本概念
### 3.4 数据类型
1.初始话对象的时候可以将对象初始化成null
```
let aa=null;
if(aa==null){
    aa='23';
}
```
2.js浮点数值的最高精度为17位小数，数值太大的时候用科学计数法，如 3.12345e7
```
a=0.2;
b=0.1;
a+b=0.300000000000000004
问题：
    如何判断2个小数相加的和等于某个值
```
3.NaN 与 isNaN()

4.字符串一旦被创建就不能被改变
```
let aa='123';
aa='3456';

先销毁aa然后再为aa复制3456
```
### 3.6 语句
```
with 这个有点意思 会有性能问题
```
5.对象
```
hasOwnProperty()   检测给定的属性是否在对象中

```

## 第四章 变量、作用域和内存问题
### 4.1基本类型与引用类型
1.基本类型（基本类型是直接复制，引用类型是复制指针。）
```
undefined,Null,Boolean,Number,String

```
2.函数传值实质是按照复制的方式传值

3.类型检测
```
比较常用的有 typeof 但是
typeof null->object
typeof new Object() ->object

可以采用 instanceof 检测引用类型

```
### 4.3垃圾回收
1.标记清楚

2.引用计数

3.解除引用
```
将全局的变量设置为null，优化内存
```

## 第五章 引用类型
```
Object,Array,
```
### 5.1 Object
1.创建对象的2种方式
```
var aa=new Object();      //构造函数法

var bb={c:'1234'};     //字面量表示法
```
采用字面量表示法时，最后一个属性值后面添加逗号在IE7之前版本以及Opera中会导致错误

2.访问对象的方法 点表示法以及方括号表示法

### 5.2 Array
1.创建数组的2种方式
```
var aa= new Array();
var aa= new Array(5);
var aa=new Array('a','1');

//也可以省略关键词new

var bb=[1,3,4];
var bb=[,,,]  //不同浏览器表现不一致，不推荐
```

2.array.length  可写、可读

```
var aa=[1,2,3];
aa.length=2;    //aa=[1,2];
aa.length=4;  //aa=[1,2,undefind,undefind]

//向数组末尾添加一个值
aa[aa.length]='4';
```
3.数组最多只能包含4294 967 295个项

4.判断是不是数组
```
let value=[];
value instanceof Array   //检测有问题，只能在全局范围类

Array.isArray(value)
```

5. Array.jion()方法

6.数组的栈方法
```
push()  //推入栈顶
pop()  //移除栈顶
```
7.数组的队列方法
```
shift()  //移除队头
unshift()  //增加队头
```

8.数组的排序
```
reverse() //颠倒顺序
sort() //排序
```
9.数组的操作方法
```
1.concat()  //连接数组   返回一个新的数组，也可用于数组的复制
2.slice() //返回一个新的数组   返回指定项之间的数组
3.splice(a,b,...[c])  //删除数组，插入数组，替换数组 会改变原数组 
// a 起始位置  b要删除的项的个数   c要插入的项

4.查找 indexOf() 与lastIndexOf()   //查找指定的项 ，内部使用 '==='操作符 返回指定项的位置

5.数组的迭代

every()  //对数组的每一项都运行给定的函数，全部返回true，则返回true
filter() //对每一项执行函数，返回结果为true的项组成的数组
forEach()  //对每一项都执行函数
map() //对每一项都执行函数，返回调用结果组成的数组
some() //对每一项都执行函数，对任意一项放回true，则返回true  [可以用用]
find()  //返回找到的第一项

6.归并方法
reduce()   //从头开始
reduceRight()   //从尾开始

var aa=[1,2,3,4,5];
var sum=aa.reduce((prev,cur,index,array)=>{
    return prev+cur
    
});

// sum=15

```

### 5.3 Date 
1.创建
```
let date=new Date();

Date.parse();//将传入的字符串格式的日期格式化毫秒，字符串格式因浏览器而异

Date.UTC();  //功能同上，但接受参数固定 [年，月(从0开始算)，日，时，分，秒，毫秒]

Date.now() ;//取得调用改方法时的时间
或者直接 let start =+ new Date();  增加了一个+号

```
2.相关方法
```
toDateString();
toTimeString();
toLocaleDateString();
toLocaleTimeString();
toUTCString();
注意：日期转换在不同浏览器上表现可能不一致
```

### 5.4 RegExp 
1.表达式
```
var aa=/pattern/flag;

var bb=new RegExp('[bc]at','g')

标志：
    g:全局
    i:不区分大小写
    m:多行匹配
    
元字符需要转义
元字符包括：() [] {} \ ^ $ | ? * + .

ES3与ES5，字面量表达式与构造函数创建的结果不一致，需要注意。ES3字面量会共享一个RegExp实例。ES5创建出来的一致。


```

2.实例方法
```
1.exec()   //返回包含第一个匹配项信息的数组 
2.test()  //返回true或者false
```

3.RegExp构造函数的属性

```

```

4.模式的局限性
```
详见 109页
```
### 5.5 Function

1.函数没有重载

2.函数声明与函数表达式
```
function sum(a,b){
    return a+b;
}

//采用函数的声明方式可以在作用域内的任意位置调用函数，会将函数声明提升到顶部

采用函数表达式的方式就会在未声明之前使用会报 unexpected identifier(意外标识符)错误

```

3.作为值得函数

```
典型的针对对象的具体属性排序问题

function comparison(key){
    return function(Object1,Obejct2){
        let aa=Object1[key];
        let bb=Object2[key];
        if(aa<bb){
            return -1;
        }
        else if (aa>bb){
            return 1;
        }else{
            return 0;
        }
    }
}

let data=[{name:'12',value:'12'},{name:'23',value:'34'}];
data.sort(comparison['name']);


```

4.函数的内部属性

```
arguments
    arguments有个callee的属性，始终指向拥有这个arguments对象的函数

比如经典的阶乘问题可以这样写

function factorial(num){
    if(num<=1){
        return 1;
    }
    return num*argument.callee(num-1);
}

this 引用的是函数执行环境的对象

caller 保存调用当前函数的函数的引用

callee与caller 在严格模式下会报错


```

5.函数的属性与方法
```
length //表示函数接收参数的个数

call() 方法与apply()方法  主要是扩充函数赖以运行的作用域

详见 书 117页

bind()  ES5 新增


```

### 5.6基本包装类型

```
Number Boolean String
```

1.Boolean

2.Number
```
toFiexd()  //保留几位小数  一般情况是0-20位
toExponentTial()  //返回科学计数的小数位
toPrecision()  

```

3.String
```
charAt()
charCodeAt()

slice(),
substr(),
substring()

indexOf()
lastIndexOf()

trim() //删除前置与后缀的空格

大小写转换
toLowerCase()
toUpperCase()

字符串匹配
match()
search()
replace()  //功能比较强大，第二个参数可以接受函数
详见128页 
```

### 5.7 内置对象
```
Global 
```
1.Global
```
//有效的URI不能包含某些字符
encodeURI()  //地址编码
encodeURIComponent()  //会对所有不标准的都进行编码

解码
decodeURI()
decodeURIComponent()
```
2.eval()  //可以看成一个完成的JS解析器

3.window 对象

4.Math对象
```
舍入方法
Math.ceil() 上舍入
Math.floor() 下舍入
Math.round() 四舍五入

random() 方法  //生成随机数
```

## 第六章 面向对象的程序设计
### 6.1 理解对象
```
Object.defineProperty()  修改默认属性
Object.defineProperties() 同时修改多个
```

###### 1.访问器属性

```
getter() 
setter()

```

支持的浏览器 IE 9+、Firefox 4+ Safari 5+ 、Opera 12 + 、Chrome

###### 2.创建对象
1.工程模式

2.构造函数模式
```
构造函数中的方法会带来重复创建的问题

[注]按照惯例，构造函数始终都应该以一个大写字母开头
```
3.原型模式
```
检测对象中的属性是来自实例还是原型中
Obj.hasOwnProperty()

in 操作符

for in 返回所有能够通过对象访问的、可枚举的属性、其中包括存在于实例中的属性，也包括存在于原型中的属性

Object.keys() 返回一个包含所有的可枚举属性的字符串数组

```


4.构造函数与原型结合的方式

5.动态原型模式
```
function Person(name,age){
    this.name=name;
    this.age=age;
    if(typeof this.sayName!='function'){
        Person.prototype.sayName=function(){
            console.log(this.name);
        }
    }
}
```
6.寄生构造函数模式

7.稳妥构造函数模式

###### 3.继承



## 第七章 函数表达式
### 
1.匿名函数也叫拉达姆函数

2.在编写递归函数时，使用arguments.callee函数更安全

### 7.2闭包
闭包是指有权限访问另一个函数作用域中变量的函数
```
function createFn(){
    var result=new Array();
    for(var i=0;i<10;i++){
        result[i]=function(num){
            return function(){
                return num;
            }
        }(i);
    }
    return result;
}
```

闭包中this的指向

```
var name="The Window"
var object={
    name:'name2',
    getNameFunc:function(){
        return function(){
            return this.name;
        };
    };
};

alert(object.getNameFunc());      //'The Window'
```

### 7.3块级作用域
```
(function(){
    
})();
```

1.私有作用域

2.特权方法

3.实例变量与静态私有变量   p189

### 7.4 模块模式


## 第8章 BOM

1.全局变量不能通过delete操作符删除，而直接在window对象上定义的属性可以；

2.每个框架都拥有自己的windows对象，并保存在frams的集合中；

3.获取screenX的兼容写法
```
var leftPos=(typeof windows.screenLeft=='number')?window.screenLeft:window.screenX;

var topPos=(typrof window.screenTop=='number')?window.screenTop:window.screenY;

```
4.获取页面视口大小
```
var pageWidth=window.innerWidth
var pageHeight=window.innerHeight;

if(typeof pageWidth!='number'){
    if(document.compatMode=='CSS1Compat'){
        pageWidth=document.documentElement.clientWidth;
        pageHeight=document.documentElement.clientHeight;
    }
    else{
        pageWidth=document.body.clientWidth;
        pageHeight=document.body.clientHeight;
    }
}
```

5.调整浏览器窗口大小
```
window.resizeTo();
window.resizeBy();

//这两个方法可能被浏览器禁止
```

6.导航与打开窗口
```
window.open();    //四个参数 加载的URL，窗口目标，特定字符串，是否去掉浏览器历史记录当前加载页面的布尔值

第三个参数有点意思 P200

window.close()  关闭新打开的窗口只能打开window.open打开的。

```
采用弹窗阻止插件利用window.open()的时候会抛出一个错误，需要封装到try-catch中


7.系统对话框
```
alert()、confirm()、prompt()
```

### 2 location对象
```
hash
host
hostname
href
pathname
port
protocol        //返回页面使用的协议
search     //返回url的查询字符串
```

解析查询字符串
```
function getQuery(){
    var qs=(location.search.length>0?location.search.substring(1):''),
    args={};
    items=qs.length?qs.split('&'):[],
    item=null;
    name=null;
    value=null;
    i=0;
    len=items.length;
    for(i=0;i<len;i++){
        item=items[i].split('=');
        name=decodeURLComponent(item[0]);
        value=decodeURLComponent(item[1]);
        if(name.length){
            args[name]=value;
        }
    }
    return args;
}
```

改变浏览器的位置
```
window.location
location.href


location.replace();


location.reload();    //可能从缓存中加载
location.reload(true);  //强制从服务器更新
```

### 3.navigator对象
p210

1.浏览器对象，用于判断当前浏览器

2.检测插件
plugins对象

### 4.screen对象

### 5.history对象
```
history.go(-1);
history.back();
history.forward();

history.length 属性
```

## 第9章 客户端检测
### 1.能力检测

## 第10章 DOM

### 1.节点层次
### 3.操作节点
```
appendChild() 向节点末尾添加一个节点

insertBefore(要插入的节点,作为参照的节点)


replaceChild() 替换节点

removeChild() 移除节点

cloneNode(Boolern)   //参数标记是否深度克隆



```

### 4.Document类型

```
document.title=''   //设置文档title
```

5.Element类型
判断节点类型(el.tagName)为了保险起见采用toLowerCase()

```
getAttribute()
setAttribute()
removeAttribute()


```

#### 动态脚本


## 第11章 DOM扩展

1.选择
```
querySelector()

querySelectorAll()

```

#### HTML5
1.classList
```
classList  节点的class属性

classList.add();
classList.remove();
classList.toggle();
classList.contains();   //检测是否存在

```

2.焦点管理
```
document.activeElement

document.hasFocus();   //确定文档是否获取焦点
```

3.HTMLDocument
```
1.readyState  //loading 正在加载文档  complete 已经加载完文档

2.兼容模式
document.compatMode ==='CSS1Compat'  标准模式
document.compatMode==='BackCompat'  混杂模式

3.head属性

4.字符集属性

5.自定义数据属性
data-

6.插入标记
innerHTML

outerHTML 会替换调用的元素
insertSdjacentHTML()  在指定位置插入元素

7.scrollIntoView()  方法



```

4.专有扩展 
```

IE 浏览器下
1.文档模式
IE
<meta http-equiv="X-UA-Compatible" content="IE=7">

2.IE children属性  与childNodes一致

3.contains()   判断节点之间的关系

4.innerText、outerText


```


## 第12章 DOM2与DOM3
1.

2.style样式

3.元素大小
```
偏移量
offsetHeight
offsetWidth
offsetLeft
offsetTop

客户区大小
clinetHeight
clientWidth

滚动大小
scrollHeight
scrollWidth
scrollLeft
scrollTop

```

## 第13章 事件
1.事件流
```
事件捕获->目标事件->事件冒泡
```
2.事件处理程序
```
1.HTML事件处理
2.DOM0级事件处理
div.onclick=function(){
    
}

div.onclick=null;      //删除事件

3.DOM2级事件处理
div.addEventListener('click',function(){

    
})

div.removeEventListener('click',aa);


4.IE事件处理
attachEvent()
detachEvent()

div.attachEvent('onclick',function(){
    
}
)


```

3.事件对象
```
event.preventDefault()     //阻止默认事件
event.stopPropagation()   //阻止冒泡


跨浏览器的事件对象
event.target||event.srcElement

event.preventDefault()||event.returnValue=false;

event.stopPropagation()||event.cancelBubble=true;
```

4.事件类型
```
1.UI事件
load
unload
abort
error
select
resize
scroll

```

6.事件模拟
在document中使用createEvent()方法创建event对象


## 第14章 表单脚本


## 第15章 canvas绘图

## 第16章 HTML5脚本编程
1.跨文档消息传递 XDM
```
采用 postMessage()方法，适用于包含在当前页面的iframe中或者由当前页面弹出的窗口

window对象的message事件

```

2.原生拖放
```
dragstart
drag
dragend




dragenter
dragover
dragleave或drop
```

3.媒体元素


4.历史状态管理



