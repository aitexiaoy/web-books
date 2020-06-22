# JS权威指南读书笔记

### 第二十章 客户端存储

#### 20.1 localStorage和sessionStorage
###### 1. 特点
\ |存储有效期|作用域|api
---|---|---|---|----------
localStorage|永久存储|同源同浏览器限制|`setItem(key:String, data:String)` 设置storage <br> `getItem(key:String)` 获取指定key的值 <br> `removeItem(key:String)` 移除某项值 <br> `clear()` 清空所有
sessionStorage|当前会话|同源同浏览器|同localStorage

###### 2. 存储事件
如果storage发生变化，则会触发改事件，该事件是广播的。也就是说浏览器中所有已打开的同源文档（除了当前触发变化脚本所在文档）都能收到storage事件。
```js
document.addEventListener('storage',(e)=>{
    const { key, oldValue, newValue, storageArea, url }=e
})
```
key: storage中变化的key，如果是clear()，则key为null
newValue: 新的值（当前某项的值，不是storage的对象），调用removeItem时，该值为null
oldValue: 旧值，之前没有的旧值为null
storageArea: 操作的目标，localStorage还是sessionStorage
url: 触发该值变化脚本所在文档的URL

###### 3. 存储大小限制
不同浏览器所采用的限制不同，一般PC浏览器再5242880个字符，也就是差不多5M的总数据。数据量大了浏览器会抛出错误。


思考：在一个浏览器中打开的不同`<iframe>`页面呢？

#### 20.2 cookie
###### 1. 特点
1. cookie主要用于服务端能够读取客户端的一些数据，cookie在每次请求中都会带上
2. cookie可以设置超时时间，如果不设置超时时间，会话结束就丢失
3. cookie有大小限制，一般在4K
4. cookie的作用域可以通过设置`path`与`domain`进行控制。


#### 20.3 利用IE userData持久化数据
#### 20.4 应用程序存储和离线web应用
```html
<meta manifest = 'demo.appcache'> // 这个文件格式是官方推荐的
```

#### IndexedDB与web SQL
#### 其他 PWA介绍
###### 1. servers work
###### 2. cacheStorage
[CacheStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage)