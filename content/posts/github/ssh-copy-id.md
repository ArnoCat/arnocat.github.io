---
author: "arno"
date: 2024-07-10
linktitle: ssh-copy-id
type:
- post
- posts/github
title: ssh-copy-id
weight: 10
series:
- Hugo 101
---


## ssh-copy-id

ssh-copy-id在服务器上安装SSH 密钥作为授权密钥。其目的是提供访问权限，而无需每次登录都输入密码。这有助于使用 SSH 协议实现自动、无密码登录和单点登录。

### 1. 生成密钥,并添加到 SSH 服务器

```bash
$ ssh-keygen -t rsa -C "welcome to linuxcool.com"

$ cd ~/.ssh
$ ls
id_rsa          id_rsa.pub

$ ssh-copy-id -i ~/.ssh/id_rsa.pub xxx@ip
usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/xxx/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
xxx@xxx.158's password:

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh 'xxx@xxx.158'"
and check to make sure that only the key(s) you wanted were added.

```

### 在 ~/.ssh下的config 文件添加如下内容即可简化ssh调用

```text
Host xx
    Hostname xxx.158
    Port 22
    User xxx
```

### 使用ssh xx即可无需密码直接登陆

```bash
ssh xx

```

### 参考

[ssh-copy-id]<https://www.ssh.com/academy/ssh/copy-id>
