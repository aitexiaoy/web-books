### 闭包js

### AMD

require.js

### CMD

seajs

### CommonJS

`CommonJS` 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

AMD规范则是非同步加载模块，允许指定回调函数。

由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以` CommonJS `规范比较适用。

但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用` AMD `规范。


### ES6 modules

`CommonJS` 模块输出的是一个值的拷贝，`ES6` 模块输出的是值的引用。

`CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口

参考手册

[ES6 系列之模块加载方案](https://github.com/mqyqingfeng/Blog/issues/108)