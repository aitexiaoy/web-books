### 如何在VScode中使用babel-node调试ES6代码?

1. 安装`@babel/node`

```shell
npm i @babel/node -D
```

   

2. 新建调试文件 `launch.json`

配置`launch.json`

- 配置`runtimeExecutable`，用`babel-node`来debug
- 开启`sourcemap`, "sourceMaps":true
- 配置`env`，不影响babel其他功能
   
```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "current file",
      "program": "${file}",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node",
      "sourceMaps": true,
      "env": {
        "BABEL_ENV": "debug"
      }
    }
  ]
}
```

3. 配置`.babelrc`

debug对应launch.json中的 "BABEL_ENV": "debug"

```json
{
  "presets": ["@babel/preset-env"],
  "env": {
    "debug": {
      "sourceMaps": "inline",
      "retainLines": true
    }
  }
}
```

