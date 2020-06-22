HTTP Cookie 是服务器与用户浏览器之间保存在本地的状态信息的一小块数据（http是无状态协议）。他会在浏览器下次请求之间自动发送给服务器。

Cookie主要用于几个方面

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

现在一般用cookie进行会话状态管理。

服务器通过`set-cookie`字段向服务器传递`cookie`

```js
Set-Cookie: <cookie名>=<cookie值>
```

之后，浏览器对该服务器发起的每一次新请求，浏览器都会将之前保存的`Cookie`信息通过`Cookie`字段再发送给服务器。

#### 会话期Cookie

也就是浏览器每次关闭后，相应的`Cookie`也一起被删除了，会话期`Cookie`不需要设置`Expries`(过期时间)与`Max-age`(有效期)。

!> 注意：现代浏览器都提供了会话恢复功能，比如`Chrome`浏览器崩溃后退出后再次打开会提醒是否打开之前页面。这种情况下即使关闭了浏览器，会话期Cookie也会被保留下来，就好像浏览器从来没有关闭一样。

#### 持久性Cookie

通过设置Cookie的`Expries`(过期时间)或者`Max-age`(过期时间)来控制。`Max-age`优先级高于`Expries`

```js
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```
!> 注意：过期时间是浏览器的时间，不是服务器的时间

#### `Secure`与`HttpOnly`

`Secure` 标记的Cookie，只能通过被HTTPS协议加密过的请求发送给服务端。但即便设置了` Secure `标记，敏感信息也不应该通过Cookie传输，因为Cookie有其固有的不安全性，`Secure `标记也无法提供确实的安全保障。从` Chrome 52 `和` Firefox 52 `开始，不安全的站点（http:）无法使用Cookie的` Secure `标记。

`HttpOnly` 标记的Cookie，它们只能发送给服务端。不能被客户端` JavaScript `脚本调用，可以避免跨域脚本 (XSS) 攻击(恶意脚本不能读取到Cookie)

#### Cookie的作用域

`Domain` 标识指定了哪些主机可以接受Cookie，没有配置的话就是文档所在的域名下。如果指定了Domain，则一般包含子域名。

例如，如果设置 `Domain=mozilla.org`，(会忽略域名前的`.`).则Cookie也包含在子域名中（如developer.mozilla.org)

`path` 标识指定了主机下的哪些路径可以接受Cookie（该URL路径必须存在于请求URL中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。

#### 跨域解决 SameSite

`SameSite` Cookie允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF)，`SameSite` cookies是相对较新的一个字段，基本浏览器都支持(IE除外)。但是之前Chrome浏览器SameSite的默认字段相当于是`None`，高版本后默认`Lax`

```js
Set-Cookie: key=value; SameSite=Strict
```

`SameSite`有以下字段

- `None`: 浏览器会在同站请求、跨站请求下继续发送cookies，不区分大小写。也就是都能发送Cookie

- `Strict`: 。浏览器将只发送相同站点请求的cookie(即当前网页URL与请求目标URL完全一致)。如果请求来自与当前location的URL不同的URL，则不包括标记为Strict属性的cookie(严格限制，只能同站下)。

- `Lax` 在新版本浏览器中，为默认选项，`Same-site cookies` 将会为一些跨站子请求保留，如图片加载或者frames的调用，但只有当用户从外部站点导航到URL时才会发送。如link链接(相对宽松，只能在`get`方法提交表单况或者`a`标签发送)

!> 注意：以前，如果SameSite属性没有设置，或者没有得到运行浏览器的支持，那么它的行为等同于None，Cookies会被包含在任何请求中——包括跨站请求。但是，在新版本的浏览器中，SameSite的默认属性是SameSite=Lax。换句话说，当Cookie没有设置SameSite属性时，将会视作SameSite属性被设置为Lax——这意味着Cookies将会在当前用户使用时被自动发送。如果想要指定Cookies在同站、跨站请求都被发送，那么需要明确指定SameSite为None


##### 问题：ajax请求如何跨域携带cookie??

首先设置cookie的`SameSite`字段也需要设置为`None`，因为现在浏览器默认为`Lax`了

1. 一级域名一致的
直接设置`Domain="一级域名"`

2. 一级域名不一致的设置 `withCredentials` 为true

```js
axios.defaults.withCredentials = true
```

同时服务端设置

```js
response.setHeader("Access-Control-Allow-Credentials", "true");
```

同时`Access-Control-Allow-origin`不能设置为`*`了

```js
response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
```
