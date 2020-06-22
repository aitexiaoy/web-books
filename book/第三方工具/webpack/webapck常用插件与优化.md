### webpack常用插件

插件里面可以做很多事了，在插件里面能监听到生命周期，能获取到webpack的实例

[webpack-plugin](https://www.webpackjs.com/plugins/)

#### `DLLPlugin`与`DLLReferencePlugin` 

生成独立的DLL.js文件以及引入

生成dll.js文件与json文件
```js
// 常用配置
const webpack = require('webpack')
const packages = ['axios','antd','react'] // ...
module.exports = {
    mode: 'production',
    entry: {
        vendor: packages
    },
    output: {
        path: path.join(rootPath, 'dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(rootPath, 'dll', '[name]-manifest.json'),
            name: '[name]_library',
            context: rootPath
        })
    ]
}
```
使用

```js
new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, 'dll/vendor-manifest.json')
})
```

#### `DefinePlugin` 

定义webpack的"全局"变量，这样在webpack的项目中就可以把定义的字段当做是一个全局变量了，在打包阶段就会替换相关的值。如果使用了`eslint`需要在`eslint`的global中加入相关字段。

```js
new webpack.DefinePlugin({
    THEME: JSON.stringify('theme') //必须进过JSON格式化一下
})
```

#### clean-webpack-plugin

清空`output`指定的目录

#### copy-webpack-plugin

复制文件

#### html-webpack-plugin

加载处理模板文件

```js
 new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html', // 输出文字
      template: 'index.html'
    }),
```

#### web-webpack-plugin

一个很好的`html-webpack-plugin`替代品, 可以使 `webpack` 以 `HTML` 为入口和方便的管理多个页面。

[项目地址](https://github.com/gwuhaolin/web-webpack-plugin)

#### HotModuleReplacementPlugin

开启热替换功能

#### ContextReplacementPlugin

修改`require`语句在寻找文件时的默认行为

#### mini-css-extract-plugin

压缩css

#### MinChunkSizePlugin

通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上

```js
new webpack.optimize.MinChunkSizePlugin({
  minChunkSize: 10000 // Minimum number of characters
})
```

#### friendly-errors-webpack-plugin

webpack错误友好输出

#### stylelint-webpack-plugin



### webpack 常用loader

`loader`具有单一职责，给一个输入，返回一个新的输出。类似js纯函数。loader支持链式调用。上一个loader的输出是下一个loader的输入。loader写的时候最后一个loader先执行输出（只是先执行输出，在注册的时候还是安装`rules`数组的顺序）。

[webpack-loader](https://www.webpackjs.com/loaders/thread-loader/)

#### 加载文件

##### raw-loaer
将文本文件加载到代码中

##### file-loader

##### url-loader

可以将图片文件转成`base64`格式的

##### json-loader

##### image-loader

##### node-loader

#### 处理js的

##### pug-loader

将pug模板转换成Javascript并返回

##### markdown-loader

将markdown文件转成html文件

##### babel-loader

##### ts-loader

##### vue-loader

#### 处理样式

##### style-loader

##### css-loader

##### postcss-loader

自动浏览器css前缀

##### sass-loader

#### 检查

##### eslint-loader

eslint代码检查

##### tslint-loader

tslint代码检查

#### 其他

##### thread-loader

对线程池


### webpack打包速度优化

#### 多线程

- `HappyPack`
- `thread-loader` 

#### 缩小搜索范围

- 设置`loader`的`include`与`exclude` 减小loader的搜索范围
- `resolve.modules` 指明第三方模块的绝对路径 (减少不必要的查找)
- `resolve.mainFields` 只采用 `main`字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)，当然一般不用设置，因为有的包可能还提供了`module`或者`jsnext:main`入口，方便做`tree shaking`
- `resolve.extensions` 尽可能减少后缀尝试的可能性

#### 提取公共资源

- 使用 `html-webpack-externals-plugin`，将基础包通过` CDN `引入，不打入` bundle `中
- 使用 `SplitChunksPlugin` 进行(公共脚本、基础包、页面公共文件)分离(Webpack4内置) ，替代了 `CommonsChunkPlugin` 插件


#### DLL

- `DLLPuglin` 与 `DllReferencePlugin`  // 一般将第三方包打包成独立的dll.js文件

#### 开启缓存

- `babel-loader`的`cacheDirectory`=true  // 开启`babel-loader`的文件缓存
- `terser-webpack-plugin` 压缩代码的插件，开启`parallel`参数
- 使用 `cache-loader` 或者 `hard-source-webpack-plugin`

- 通过`webpack-builder-analyzer` 插件 进行打包文件的分析
