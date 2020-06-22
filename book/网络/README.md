### ajax（XMLHttpRequest与fetch)

#### XMLHttpRequest

```html
<script>
    var xmlhttp;
    var url=='';
    function loadXMLDoc(){
        xmlhttp=null;
        if(window.XMLGttpRequest){
            xmlhttp=new XMLHttpRequest();
        }else if(window.ActiveXObject){
            xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
        }
        if(xmlhttp!=null){
            xmlhttp.onreadystatechange=state_Change;
            xmlhttp.open("GET",url,true);    //第三个参数true表示异步，flase表示同步
            xmlhttp.send(null);
        }
        else{
            alert("Your browser does not support XMLHTTP.");
        }
    }
    function state_Change()
    {
    if (xmlhttp.readyState==4)
      {// 4 = "loaded"
      if (xmlhttp.status==200)
        {// 200 = OK
        // ...our code here...
        }
      else
        {
        alert("Problem retrieving XML data");
        }
      }
    }
    
    
    //中止ajax请求
    if(xmlhttp){
        xmlhttp.abort();
    }
</script>

```
参考：[XMLHttpRequest 对象](http://www.w3school.com.cn/xmldom/dom_http.asp)

#### fetch

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```
参考: [fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)


### 什么是跨域，如何解决跨域问题

跨域即不同源，什么是同源呢，同源即协议、域名、端口均相同。

#### 如何解决跨域问题呢？

- JSONP

利用script标签不受同源策略的限制，利用一个回调函数传递参数。

- 设置反向代理

- XHR2-CORS

```js


response.setHeader("Access-Control-Allow-Origin", "http://m.juejin.com/");  // 第二个参数填写允许跨域的域名称，不建议直接写 "*"
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");//授权请求的方法（GET, POST, PUT, DELETE，OPTIONS等)

// 接收跨域的cookie
response.setHeader("Access-Control-Allow-Credentials", "true");
```

- 利用img标签的src可以跨域的特性，实现一些数据统计类的。只能发起请求不能收到回应。

```html
<script type="text/javascript">
     var thisPage = location.href;
     var referringPage = (document.referrer) ? document.referrer : "none";
     var beacon = new Image();
     beacon.src = "http://www.example.com/logger/beacon.gif?page=" + encodeURI(thisPage)
     + "&ref=" + encodeURI(referringPage);
</script>

```


### 什么是option请求

1、获取服务器支持的HTTP请求方法；也是黑客经常使用的方法。

2、用来检查服务器的性能。例如：AJAX进行跨域请求时的预检，需要向另外一个域名的资源发送一个HTTP OPTIONS请求头，用以判断实际发送的请求是否安全。

### HTTP与HTTPS
HTTPS在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密

#### 主要差别

1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全


### HTTP2
- 二进制分帧
- 头部压缩
- 服务端推送
- 多路复用
- 优化手段

##### 参考:

[http2 简介](https://juejin.im/post/5aaccf8f51882555784dbabc)

[HTTP2 详解](https://juejin.im/post/5b88a4f56fb9a01a0b31a67e)


### http请求头有哪些，分别代表什么意思（Request Header）

Header | 解释 |	示例
---|---|---
Accept|指定客户端能够接收的内容类型	|Accept: text/plain, text/html
Accept-Charset|	浏览器可以接受的字符编码集。|	Accept-Charset: iso-8859-5
Accept-Encoding	|指定浏览器可以支持的web服务器返回内容压缩编码类型。|	Accept-Encoding: compress, gzip
Accept-Language	|浏览器可接受的语言	|Accept-Language: en,zh
Accept-Ranges|	可以请求网页实体的一个或者多个子范围字段|	Accept-Ranges: bytes
Authorization|	HTTP授权的授权证书|	Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Cache-Control|	指定请求和响应遵循的缓存机制|	Cache-Control: no-cache
Connection|	表示是否需要持久连接。（HTTP 1.1默认进行持久连接）|	Connection: close
Cookie|	HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。|	Cookie: $Version=1; Skin=new;
Content-Length|	请求的内容长度|	Content-Length: 348
Content-Type|	请求的与实体对应的MIME信息|	Content-Type: application/x-www-form-urlencoded
Date|	请求发送的日期和时间|	Date: Tue, 15 Nov 2010 08:12:31 GMT
Expect|	请求的特定的服务器行为|	Expect: 100-continue
From|	发出请求的用户的Email|	From: user@email.com
Host|	指定请求的服务器的域名和端口号|	Host: www.zcmhi.com
If-Match|	只有请求内容与实体相匹配才有效|	If-Match: “737060cd8c284d8af7ad3082f209582d”
If-Modified-Since|	如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码|	If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT
If-None-Match|	如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变|	If-None-Match: “737060cd8c284d8af7ad3082f209582d”
If-Range|	如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag|	If-Range: “737060cd8c284d8af7ad3082f209582d”
If-Unmodified-Since|只在实体在指定时间之后未被修改才请求成功|	If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT
Max-Forwards|	限制信息通过代理和网关传送的时间|	Max-Forwards: 10
Pragma|	用来包含实现特定的指令|	Pragma: no-cache
Proxy-Authorization	|连接到代理的授权证书|	Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Range|	只请求实体的一部分，指定范围|	Range: bytes=500-999
Referer|	先前网页的地址，当前请求网页紧随其后,即来路	|Referer: http://www.zcmhi.com/archives/71.html
TE|	客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息|	TE: trailers,deflate;q=0.5
Upgrade|	向服务器指定某种传输协议以便服务器进行转换（如果支持）|	Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11
User-Agent|	User-Agent的内容包含发出请求的用户信息|	User-Agent: Mozilla/5.0 (Linux; X11)
Via	|通知中间网关或代理服务器地址，通信协议|	Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)
Warning	|关于消息实体的警告信息|	Warn: 199 Miscellaneous warning

### http响应头有哪些，分别代表什么意思（Responses Header）

Header|	解释|	示例
---|---|---
Accept-Ranges	|表明服务器是否支持指定范围请求及哪种类型的分段请求|	Accept-Ranges: bytes
Age|	从原始服务器到代理缓存形成的估算时间（以秒计，非负）|	Age: 12
Allow|	对某网络资源的有效的请求行为，不允许则返回405|	Allow: GET, HEAD
Cache-Control|	告诉所有的缓存机制是否可以缓存及哪种类型|	Cache-Control: no-cache
Content-Encoding|	web服务器支持的返回内容压缩编码类型。|	Content-Encoding: gzip
Content-Language|	响应体的语言|	Content-Language: en,zh
Content-Length|	响应体的长度|	Content-Length: 348
Content-Location|	请求资源可替代的备用的另一地址|	Content-Location: /index.htm
Content-MD5	|返回资源的MD5校验值|	Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==
Content-Range|	在整个返回体中本部分的字节位置|	Content-Range: bytes 21010-47021/47022
Content-Type|	返回内容的MIME类型|	Content-Type: text/html; charset=utf-8
Date|	原始服务器消息发出的时间|	Date: Tue, 15 Nov 2010 08 : 12 :31 GMT
ETag|	请求变量的实体标签的当前值|	ETag: “737060cd8c284d8af7ad3082f209582d”
Expires	|响应过期的日期和时间|	Expires: Thu, 01 Dec 2010 16:00:00 GMT
Last-Modified|	请求资源的最后修改时间|	Last-Modified: Tue, 15 Nov 2010 12: 45 :26 GMT
Location|	用来重定向接收方到非请求URL的位置来完成请求或标识新的资源|	Location: http://www.zcmhi.com/archives/94.html
Pragma|	包括实现特定的指令，它可应用到响应链上的任何接收方|	Pragma: no-cache
Proxy-Authenticate|	它指出认证方案和可应用到代理的该URL上的参数|	Proxy-Authenticate: Basic
refresh	|应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）|Refresh: 5; url=http://www.zcmhi.com/archives/94.html
Retry-After	|如果实体暂时不可取，通知客户端在指定时间之后再次尝试|Retry-After: 120
Server|	web服务器软件名称|	Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)
Set-Cookie|	设置Http Cookie|	Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1
Trailer	|指出头域在分块传输编码的尾部存在|	Trailer: Max-Forwards
Transfer-Encoding|	文件传输编码|	Transfer-Encoding:chunked
Vary|	告诉下游代理是使用缓存响应还是从原始服务器请求|	Vary: *
Via|	告知代理客户端响应是通过哪里发送的|	Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)
Warning|	警告实体可能存在的问题|	Warning: 199 Miscellaneous warning
WWW-Authenticate|	表明客户端请求实体应该使用的授权方案|	WWW-Authenticate: Basic

### 常见的http返回码有哪些表示什么意思
分类|	分类描述
---|---
1**	|信息，服务器收到请求，需要请求者继续执行操作
2**|	成功，操作被成功接收并处理
3**	|重定向，需要进一步的操作以完成请求
4**	|客户端错误，请求包含语法错误或无法完成请求
5**	|服务器错误，服务器在处理请求的过程中发生了错误



状态码|	状态码英文名称|	中文描述
---|---|---
200	|OK|	请求成功。一般用于GET与POST请求
301	|Moved Permanently	|永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
400	|Bad Request|	客户端请求的语法错误，服务器无法理解
404|	Not Found|	请求失败，请求所希望得到的资源未被在服务器上发现。没有信息能够告诉用户这个状况到底是暂时的还是永久的。假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，而且没有任何可以跳转的地址。404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下。
500	|Internal Server Error|服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。

### 浏览器缓存问题
浏览器缓存的问题比较多，具体参考：[前端优化：浏览器缓存技术介绍](https://juejin.im/post/5b9346dcf265da0aac6fbe57)，[浏览器缓存](https://segmentfault.com/a/1190000008377508),

在IE浏览器下浏览器会自动缓存请求的地址，如果对同一个接口频繁的请求得到不同的数据，可以为接口增加一个随机数或者时间戳来解决浏览器的自动缓存。


### RESTful

主要是统一资源，统一接口。

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供完整资源数据）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供需要修改的资源数据）。
- DELETE（DELETE）：从服务器删除资源。

参考：[RESTful 架构风格概述](https://juejin.im/post/57d0db282e958a0054496596)
