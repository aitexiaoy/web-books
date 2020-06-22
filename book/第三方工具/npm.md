### 安装
```sh
npm i
npm install

// 查看详细日志
npm i --verbose

npm install demo --save  //安装并保存到package.json中
npm insatll demo --save-dev //安装保存到package.json的开发中
```

### npm清楚缓存
```
npm cache clean -f
```

### 设置NPM仓库地址
```sh
npm config set registry http://registry.npmjs.org 
```

##### 使用国内镜像地址
```sh
npm config set registry https://registry.npm.taobao.org 
```

##### 使用nrm管理地址
1. 安装
```sh
npm install -g nrm
```
2. 添加地址
```sh
nrm add npm http://registry.npmjs.org
nrm add taobao https://registry.npm.taobao.org
nrm add ml http://fe.mlamp.cn:2018
```
3. 切换地址
```sh
nrm use taobao
nrm use npm
nrm use ml
```

### 在命令行设置命令行的代理
// 先安装ssh打开,然后查看代理的端口
```sh
export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;
```

### 取消代理
```sh
＃去掉代理
unset http_proxy
unset https_proxy
```

### 查看命令行ip
```sh
curl ip.gs
```

### 制作自己的npm包

1. 在 https://www.npmjs.com/ 中注册账号并通过邮箱认证
2. 在项目目录中执行`npm init` 根据提示一步一步填
```
package name：填写你这个包的名字，默认是你这个文件夹的名字（nodeadd）
version：填写你这个包的版本，默认1.0.0
description：描述一下你这个包是干嘛用的
entry point：入口文件，默认是index.js，你也可以自己填写你自己的文件名
test command：测试命令，默认为空，直接回车就行
git repository：git仓库地址，如果你的包是先放到github上或者其他git仓库里，这时候你的文件夹里面会存在一个隐藏的.git目录，npm会读到这个目录作为这一项的默认值。如果没有的话，直接回车继续。
keywords：关键词，方便别人搜到这个包(数组)
author：你的账号
license： 你的这个包遵循什么开源协议，直接回车就行
```
3. 添加`README.md`
5. 登录 `npm login`
4. 发布，执行`npm publish`
- 注：发布一个版本后如果修改部分代码，再次发布需要修改版本号
5. 如果想删除自己的包，执行`npm unpublish` 然后再执行 `npm --force unpublish`
- 注：删除包后需要24小时后才能再次发布该包
