### git克隆远程仓库
```
// 默认master分支
git clone [远程仓地址]

git clone -b [指定分支] [远程仓地址]
```

### git配置全局参数
```
git config --global user.name "[用户名]"

// github 会根据邮箱地址确定贡献率，所以最好将邮箱地址设置成语github账号一致。如果有多个git服务器，可以参考多服务器的解决方案
git config --global user.email "[邮箱地址]"
```

### git新建本地仓库
```
git init
```
### git 将本地仓库关联到远程仓库
```
git remote add origin [远程仓地址]
```

### git查看远程仓地址
```
git remote -V
```
### 修改远程仓地址
##### 1.修改命令
```
git remote set-url origin [url]
```
##### 2.先删后加
```
git remote rm origin
git remote add origin [url]
```
##### 3.直接修改config文件

### git 提交
```
git push

git push origin [分支名]

git push -u origin [分支名] -u 参数指定一个默认主机，这样后面就可以不加任何参数使用git push


```

### git 强推
```
git push --force origin [分支名]
git push -f origin [分支名]
```

### git获取代码
```
git pull
```

### git 提交
```
git commit -m "描述信息"
```

### git 增加文件
```
git add readme.txt

// 增加所有改动的文件
git add .
```

### git 切换分支
```
git checkout master(分支)
```

### git 新建分支
```
$ git branch dev
```

### git 新建分支并切换
```
git checkout -b dev
```
### git 查看当前分支
```
git branch
```

### git合并dev分支到当前分支
```
git merge dev
```

### git合并远程分支内容
```
git fetch //更新
git merge origin/[分支名]
```
或者直接
```
git pull origin [远程分支名]:[本地分支名]
```
如果远程分支是与当前分支合并，则冒号后面的部分可以省略：
```
git pull origin next
```

### git 删除本地分支
```
git branch -D [分支名]
```

### git 删除远程分支
```
git push origin -d [分支名]
```


### 获取远程所有分支
```
git ls-remote
```

### 从远程拉去本地不存在分支
```
//拉取不成功的话先同步一下分支执行一下git fetch
git fetch    
git checkout -b [本地分支名] origin/[远程分支名]

```

### git 合并指定分支指定文件的更改
```
git checkout [分支名] [文件名]

// 如
git checkout develop ./src/page/a.vue
```

### git merge指定commit
1. 首先查看commit_id
```
git log
```
2. 合并
```
git merge d88744e0eeb90c51f993df91ddbc321dca3f1633
```

### git回退到指定commit
```
git reset --hard d88744e0eeb90c51f993df91ddbc321dca3f1633
```

### git 打标签
```
git tag   //列出所有标签
git tag -l "v1.4.*"   //列出符合条件的标签
git tag -a v1.4 -m 'my versionv1.4' //-a 指定标签名字 -m指定对应标签的说明

//轻量级标签
git tag v1.4   //直接git tag 加标签名

//删除标签
git tag -d v1.4

//将标签推送到远程
git push origin v1.4

//删除远程标签
git push origin :refs/tags/v1.4

```

### git采用SSH秘钥连接

1. 判断有没有：cat ~/.ssh/id_rsa.pub
2. 生成ssh秘钥：ssh-keygen -t rsa -C "youremail@example.com"
3. 查看秘钥 cat ~/.ssh/id_rsa.pub
4. 复制秘钥放到git远程仓中
5. 验证秘钥是否配置成功 ssh -T git@git.coding.net || ssh -T git@github.com

各个系统操作命名不一致，需要的话自行查找


### git commit相关规范

#####  格式
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

##### type
用于说明 commit 的类别，只允许使用下面7个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

##### scope
scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同

##### subject
subject是 commit 目的的简短描述，不超过50个字符

##### Body
Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

```
Further paragraphs come after blank lines.
- Bullet points are okay, too
- Use a hanging indent
```

##### Footer
```
- 不兼容变动
- 关闭 Issue
```
#### 使用工具来完成
```
npm install -g commitizen
```
在项目目录运行,使其支持 Angular 的 Commit message 格式
```
commitizen init cz-conventional-changelog --save --save-exact
```
以后，凡是用到git commit命令，一律改为使用git cz。这时，就会出现选项，用来生成符合格式的 Commit message



###### 参考:
[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)  阮一峰

[git commit 规范指南](https://segmentfault.com/a/1190000009048911)


### git 合并多个commit

###### 1. 通过`git log`查看commit历史
```
commit 65a705e7de513894530a63ab1ccbafa34609881 (HEAD -> **)
Author: ** <**@**.com>
Date:   Thu Mar 14 18:20:51 2019 +0800
```

如上面的提交历史，合并最近2次的

###### 2. 执行`git rebase`

执行 `git rebase -i HEAD~2` 对最近的 2 个 commit 进行 rebase 操作；

会弹出对话框

```
pick c6e4557 create second.txt
pick e1a7dfa add text in second.txt

# Rebase a71eba2..e1a7dfa onto a71eba2
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```
相关说明

- 选择`pick`操作，git会应用这个补丁，以同样的提交信息（commit message）保存提交
- 选择`reword`操作，git会应用这个补丁，但需要重新编辑提交信息
- 选择`edit`操作，git会应用这个补丁，但会因为amending而终止
- 选择`squash`操作，git会应用这个补丁，但会与之前的提交合并
- 选择`fixup`操作，git会应用这个补丁，但会丢掉提交日志
- 选择`exec`操作，git会在shell中运行这个命令

将上述文档改成

```
pick c6e4557 create second.txt
squash e1a7dfa add text in second.txt

# Rebase a71eba2..e1a7dfa onto a71eba2
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

保存退出

执行完成后弹出提交内容弹框
```
# This is a combination of 2 commits.
# The first commit's message is:

create second.txt

# This is the 2nd commit message:

add text in second.txt

# 请为您的变更输入提交说明。以 '#' 开始的行将被忽略，而一个空的提交
# 说明将会终止提交。
#
# 日期：  Mon Nov 28 13:59:43 2016 +0800
#
# 变基操作正在进行中；至 a71eba2
# 您在执行将分支 'master' 变基到 'a71eba2' 的操作时编辑提交。
#
# 要提交的变更：
#   新文件：   second.txt
#
```

修改后保存退出
