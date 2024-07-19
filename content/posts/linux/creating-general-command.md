---
author: "arno"
date: 2024-07-08
linktitle: general-command
type:
- post
- posts/linux
title: general-command
weight: 10
series:
- Hugo 101
---


## 常用命令

### git

### go

```
$ go env
$ env
$ env | grep -i proxy
GOPROXY=https://goproxy.cn,direct
$ curl -I google.com
HTTP/1.1 301 Moved Permanently
Location: http://www.google.com/
Content-Type: text/html; charset=UTF-8
Content-Security-Policy-Report-Only: object-src 'none';base-uri 'self';script-src 'nonce-L_UKjT9Yze3yROlGcbG9pA' 'strict-dynamic' 'report-sample' 'unsafe-eval' 'unsafe-inline' https: http:;report-uri https://csp.withgoogle.com/csp/gws/other-hp
Date: Mon, 08 Jul 2024 09:28:33 GMT

```

### 查看端口
Linux 查看端口占用情况可以使用 lsof 和 netstat 命令。
#### lsof
```
$ lsof -i:端口号
$ lsof -i:8080：查看8080端口占用
$ lsof abc.txt：显示开启文件abc.txt的进程
$ lsof -c abc：显示abc进程现在打开的文件
$ lsof -c -p 1234：列出进程号为1234的进程所打开的文件
$ lsof -g gid：显示归属gid的进程情况
$ lsof +d /usr/local/：显示目录下被进程开启的文件
$ lsof +D /usr/local/：同上，但是会搜索目录下的目录，时间较长
$ lsof -d 4：显示使用fd为4的进程
$ lsof -i -U：显示所有打开的端口和UNIX domain文件
```
netstat -tunlp 用于显示 tcp，udp 的端口和进程等相关情况。
-t (tcp) 仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化为数字
-l 仅列出在Listen(监听)的服务状态
-p 显示建立相关链接的程序名
#### netstat
```
$ netstat -ntlp   //查看当前所有tcp端口
$ netstat -ntulp | grep 80   //查看所有80端口使用情况
$ netstat -ntulp | grep 3306   //查看所有3306端口使用情况
```

#### /bin/sh -c
带上 -c 参数的话，会把参数后面的值当作命令行，而不是普通的字符串
```
$ /bin/sh -c ls
```
如果 -c 后面的命令行有空格隔开，可以使用双引号括起来
```
$ /bin/sh -c "ls -al"
```

### kill进程
```
$ kill -9 pid

$ killall 进程名
```
### tcp

### java