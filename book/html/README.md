
### 行内元素 

`display:inline`

###### 特点：
- 设置宽高无效
- 对margin仅设置左右方向有效，上下无效，padding设置上下都有效
- 不会自动换行

标签名|说明|支持情况
---|---|---
span|定义文档中的 section|

```
span,a,abbr,acronym,b,bdo,big,br,cite,code,em,i,img,kbd,label,input,q,samp,select,strong,sub,sup,testares,tt,var
```

##### 问题：如何多个span标签之间的间隙？

1. 将多个sapn标签写在一行
```html
<span>1</span><span>2</span><span>3</span>
```
2. 给span标签增加浮动属性
```css
span{
      display:inline-block;
      background-color:#ff0000;
      height:30px;
      width:50px;
      text-align: center;
      line-height: 30px;
      float: left;
}
```
3. 将父元素的`font-size`设置为0,`text-overflow: ellipsis`会不生效

4. 采用`flex`部件


### 块级元素

- 能识别宽高
- margin，padding君有效
- 自动换行

```
div,address,caption,dd,div,dl,dt,fieldset,from,h1-h6,hr,legend,li,noframes,noscript,ol,ul,p,pre,table,tbody,thead,td,tfoot,th,tr

```

### 拖放

```
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
  <img src="/i/eg_dragdrop_w3school.gif" draggable="true" ondragstart="drag(event)" id="drag1" />
</div>
```

### canvas
```
<canvas id="myCanvas" width="200" height="100"></canvas>

<script type="text/javascript">
    var c=document.getElementById("myCanvas");
    var cxt=c.getContext("2d");
    cxt.fillStyle="#FF0000";
    cxt.fillRect(0,0,150,75);
</script>

```

### 缓存
```
<!DOCTYPE HTML>
<html manifest="demo.appcache">
...
</html>
```

### web worker  【在后台运行的javascript脚本】
```js
function startWorker()
{
    if(typeof(Worker)!=="undefined")
      {
        if(typeof(w)=="undefined")
      {
        w=new Worker("/example/html5/demo_workers.js");
      }
        w.onmessage = function (event) {
            document.getElementById("result").innerHTML=event.data;
        };
      }
    else
      {
        document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers...";
      }
}

function stopWorker()
{ 
    w.terminate();
}
```

### 音视频
```
video、audo
```
###### 解决在安卓手机微信浏览器中播放视频视频默认背景黑色的问题

### 语义化标签

[参见w3school](http://www.w3school.com.cn/html5/index.asp)

### 页面的重绘与回流
- 重绘：指的是当页面中的元素不脱离文档流，而简单地进行样式的变化，比如修改颜色、背景等，浏览器重新绘制样式
- 回流：指的是处于文档流中 DOM 的尺寸大小、位置或者某些属性发生变化时，导致浏览器重新渲染部分或全部文档的情况
相比之下，回流要比重绘消耗性能开支更大。另外，一些属性的读取也会引起回流，比如读取某个 DOM 的高度和宽度，或者使用getComputedStyle方法。在写代码的时候要避免回流和重绘。
