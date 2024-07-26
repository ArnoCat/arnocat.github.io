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


### curl 命令踩坑实录
#### 环境
```
$ curl --version

curl 7.79.1 (x86_64-apple-darwin21.0) libcurl/7.79.1 (SecureTransport) LibreSSL/3.3.6 zlib/1.2.11 nghttp2/1.45.1
Release-Date: 2021-09-22
Protocols: dict file ftp ftps gopher gophers http https imap imaps ldap ldaps mqtt pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
Features: alt-svc AsynchDNS GSS-API HSTS HTTP2 HTTPS-proxy IPv6 Kerberos Largefile libz MultiSSL NTLM NTLM_WB SPNEGO SSL UnixSockets
```
#### 报错原因 curl命令一个地址的时候报错：zsh: no matches found: https://xxx.openai.azure.com/openai/deployments/xxx/chat/completions?api-version=2024-04-01-previe
```
curl https://xxx.openai.azure.com/openai/deployments/xxx/chat/completions?api-version=2024-04-01-preview \
  -H "Content-Type: application/json" \
  -H "api-key: xxx" \
  -d '{"messages":[{"role": "system", "content": "You are a helpful assistant."},{"role": "user", "content": "Does Azure OpenAI support customer managed keys?"},{"role": "assistant", "content": "Yes, customer managed keys are supported by Azure OpenAI."},{"role": "user", "content": "Do other Azure AI services support this too?"}]}'
```

#### 解决方案参考 https://www.reddit.com/r/zsh/comments/h9mdvc/why_do_i_get_this_error_zsh_no_matches_found/?rdt=42851

1. 使用反斜杠进行转义：\?

2. 将 URL 括在引号中：'https://www.youtube.com/watch?v=mVEwurFdnYk'

3. noglob像u/grumpycrash建议的那样 使用预命令修饰符。

4. 升级mac版自带的curl

采用了第一种方案。

#### 升级curl
Mac 升级 curl 到最新版本
在 macOS 上，可以使用 Homebrew 来升级 curl 到最新版本。下面是升级 curl 的步骤：

安装 Homebrew：如果你还没有安装 Homebrew，可以在终端中运行以下命令进行安装：


$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
使用 Homebrew 升级 curl：在终端中运行以下命令来安装最新版本的 curl：


$ brew install curl
使用 brew link 覆盖系统 curl：为了确保使用的是 Homebrew 安装的 curl，可以运行以下命令将其链接到系统路径中：


$ brew link --force curl
验证 curl 版本：升级完成后，可以运行以下命令来验证 curl 版本：


$ curl --version
通过这些步骤，你应该能够将 macOS 上的 curl 升级到最新版本。

参考: https://docs.ffffee.com/frontend/240429-curl%E5%91%BD%E4%BB%A4%E7%9A%84%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.html
