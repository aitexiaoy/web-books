### 原生App与Js通信问题

```js
传递函数：
// IOS
    window.webkit.messageHandlers.iphone_send_data.postMessage(data);
// Android
    window.android.android_send_data(data);
//基本结构
// {
//     type:
//     data:{}
// }
```