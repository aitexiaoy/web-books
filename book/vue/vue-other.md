#### 采用vue-property-decorator注册全局组件编译后找不到组件问题

vue的js写的时候注册全局组件
```js
import Hello from '@/components/hello'
Vue.component(Hello.name, Hello)
```

当使用`vue-property-decorator`插件书写ts的vue组件的时候。在注册的时候拿不到name属性
```js
import Hello from '@/components/hello'
Vue.component('Hello', Hello)
// 在生产环境拿不到name属性，因此组件注册就有了问题。必须显式的指定Name属性

```

思考:为什么在开发环境就能拿到`name`值？？