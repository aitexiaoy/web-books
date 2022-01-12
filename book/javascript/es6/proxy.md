## Proxy

```js
var proxy = new Proxy(target, handle)
```

用来拦截（代理）一些行为，例如

```js
var object = new Proxy(
    {},
    {
        get: function () {
            return 35
        },
    }
)
object.time //35
object.name //35
```
