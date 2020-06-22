##### 1. 查看端口占用情况

mac

```shell
 sudo lsof -i:3000  
```
linux
```shell
netstat -anp | grep 9082
```

##### 2. 杀死某进程
```shell
sudo kill -9 PID
```

##### 3. netCat传输文件夹

云环境采用netCat进行传输
1.切换到管理员用户或者kg用户 sudo -i
2.在服务器端nest目录中运行，监听8001端口接收文件以及自动解压。传输完后会自动退出

```shell
nc -l 8001 | tar xfvz -
```

![5887d076-a2be-4168-8f6f-e68b31d71e22](http://file.qiniu.taoacat.com/uPic/20200307-092044-企业微信截图_5887d076-a2be-4168-8f6f-e68b31d71e22%281%29.png)

3.在本地dist目录中执行以下命令，压缩当前目录并传输给 175.24.16.196 
```shell
tar cfz - * | nc 175.24.16.196 8001

```

![937817a9-a99e-4613-957c-75eed858f198](http://file.qiniu.taoacat.com/uPic/20200307-092054-企业微信截图_937817a9-a99e-4613-957c-75eed858f198%281%29.png)

