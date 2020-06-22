
#### http处理表单

`Content-Type` 字段

- application/x-www-form-urlencoded
- multipart/form-data

对于`application/x-www-form-urlencoded`格式的表单内容，有以下特点:

- 其中的数据会被编码成以&分隔的键值对
- 字符以URL编码方式编码。

```js
// 转换过程: {a: 1, b: 2} -> a=1&b=2 -> 如下(最终形式)
"a%3D1%26b%3D2"
```

`multipart/form-data` 采用formData对象传输，传输文件的时候可以这个

```js
Content-Disposition: form-data;name="data1";
Content-Type: text/plain
data1
----WebkitFormBoundaryRRJKeWfHPGrS4LKe
Content-Disposition: form-data;name="data2";
Content-Type: text/plain
data2
----WebkitFormBoundaryRRJKeWfHPGrS4LKe--
```

#### 如何解决`队头堵塞`问题

http采用`一问一答`的模式进行，报文必须是一发一收。对于多个请求，会放到请求队列中。如果有某个请求响应过慢，就会阻塞其后面的请求。

##### 解决方法

1. 并发请求，比如`chrome`浏览器能支持同域名最大6个请求。

2. 资源域名分片，将不同资源放到不同的服务器中。比如现在的`cdn`。




参考文档

[（建议精读）HTTP灵魂之问，巩固你的 HTTP 知识体系](https://juejin.im/post/5e76bd516fb9a07cce750746)