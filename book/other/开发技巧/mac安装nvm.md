# mac安装nvm

日期: Jul 14, 2020

### 1.安装命令

```jsx
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

### 2.配置环境变量

在用户文件下打开`.zshrc`或者新建`.zshrc`文件，输入以下配置

```bash
vim ~/.zshrc
```

```jsx
export NVM_DIR="/Users/yangpeng/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

也可以在创建`.profile`或者`.bashrc`文件，但是注意建立成功后需要执行source命令，运行一下环境变量文件。运行后这两个文件只会在当前命令窗口起作用，重启命令窗口后需要重新运行。而.zshrc文件会在命令窗口启动的时候自动执行。

```bash
source ~/.profile
```