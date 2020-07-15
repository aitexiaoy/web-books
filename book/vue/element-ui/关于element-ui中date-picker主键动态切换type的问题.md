# 关于element-ui中date-picker主键动态切换type的问题（range与非range）

### 现象
```html
<el-date-picker
    v-model="value"
    :type="type"
>
</el-date-picker>
```
在上述代码中动态修改type的值，再点击输入框弹出日期选择poper后，再切换type，发现poper大概率情况下会出现定位不准问题。

### 解决方案

为组件绑定一个动态的key，每次type改变的时候就重新渲染组件

```html
<el-date-picker
    v-model="value"
    :key = "type"
    :type="type"
>
</el-date-picker>
```

#### 原因

`utils/vue-popper.vue` 第89行
```js
  let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;
```
`packages/date-picker/picker.vue` 第447行
```js
ranged() {
      return this.type.indexOf('range') > -1;
    },

reference() {
    const reference = this.$refs.reference;
    return reference.$el || reference;
},
```

在type改变的时候，reference取不到最新的值，在vue-popper文件中拿不到最新的定位元素。
修改reference的取值方式

```js
reference() {
    const reference = this.$refs.reference;
    return this.$ranged ? reference : reference.$el;
},
```

但是这样改会有个问题，就是在`picker/date-picker.vue`中为`type`绑定了下面函数。
因为在`type`变化后会先执行`watch`中的绑定函数，再执行其绑定的计算属性，在根据`type`进行页面的渲染（我猜是这样）这个时候在`watch`中去取`reference`的值将取到一个`undefined`。
而在`mountPicker`方法中会使用到`reference`，所以在下面加一个延时。或者加一个`this.$nextTick()`

```js
if (this.picker) {
    this.unmountPicker();
    this.panel = getPanel(type);
    this.mountPicker();
} else {
    this.panel = getPanel(type);
}
```

修改为

```js
if (this.picker) {
    this.unmountPicker();
    this.panel = getPanel(type);
    windows.setTimeout(()=>{
        this.mountPicker();
    },100)
} else {
    this.panel = getPanel(type);
}
```

这个时候在`vue-popper.vue`中的`this.reference`能去到最新值。但是`this.referenceElm`保存了上次值没有清空，所有`reference`取到的是
上次定位元素也就是取到的`this.referenceElm`中的值。

尝试在`vue-popper.vue`中的修改`doDestroy`方法中增加清空`this.referenceElm`,最后能取到正确的定位元素
```js
 doDestroy(forceDestroy) {
    /* istanbul ignore if */
    if (!this.popperJS || (this.showPopper && !forceDestroy)) return;
    this.popperJS.destroy();
    this.popperJS = null;
    // 增加
    this.referenceElm = null;
},
```

思考，在`picker.vue`中执行了`unmountPicker`方法，为啥`this.picker`中的`referenceElm`还在呢？

```js
unmountPicker() {
    if (this.picker) {
    this.picker.$destroy();
    this.picker.$off();
    if (typeof this.unwatchPickerOptions === 'function') {
        this.unwatchPickerOptions();
    }
    this.picker.$el.parentNode.removeChild(this.picker.$el);
    }
},
```

因为`referenceElm`绑定在`this`中的

如果手动将`referenceElm`初始化呢，发现箭头不在了。后面再看吧