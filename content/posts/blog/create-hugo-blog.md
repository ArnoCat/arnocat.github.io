+++
categories = ["Hugo"]
date = "2024-07-05"
description = "新建一个hugo博客"
featured = "pic01.jpg"
featuredalt = ""
featuredpath = "date"
linktitle = ""
title = "新建一个hugo博客"
slug = "新建一个hugo博客"
type = "posts"
+++

## Introduction

从零开始创建一个hugo项目并且部署到github

环境要求：
下载go 和 git


## 创建github库

1. 打开github，创建一个库
2. 输入项目名，要与 Github 用户名一致。比如我的是 arnocat，那么输入的 Repository name 就是 arnocat.github.io，README 不要勾选上。
3. setting页面选择main / docs文件夹，然后save

### 多账号github搭建 （此处自选）
```
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Generating public/private rsa key pair.
Enter file in which to save the key (~/.ssh/id_rsa):<为了区分多个key，请填写自定义的名称>

$ vim ~/.ssh/config
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_rsa
Host github.com-work
    HostName ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_rsa_work

$ ssh-add ~/.ssh/id_rsa  ssh-add ~/.ssh/id_rsa_work

$ ssh -T git@github.com

$ ssh -T git@github.com-work



```


## 安装 Hugo
```
## 我用的官方最新版，没有用brew install hugo
$ CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
$ hugo version

```

## 新建hugo网站

```
## 创建一个文件夹
$ mkdir xxx && cd xxx
## git初始化
$ git init
## 给当前文件夹设置用户名账号 （多账号的时候使用，单账号可选）
$ git config user.name xxx
$ git config user.email xxx

$ git remote add origin git@github.com:xxx/xxx.git

## 下载themes
$ git submodule add https://github.com/4s3ti/hugo-theme-hello-4s3ti.git themes/hello-4s3ti

## 将exampleSite里面的content 和resources复制到 content里面，将其他的也一一复制到book下面的空文件夹

## 将config.toml里面的内容拷贝到hugo.toml里面

## 使用命令查看是否能本地启动展示，不能根据提示修改即可
$  hugo server 

## 发布到docs文件夹
$ hugo -d docs

$ git add . 

$ git commit

$ git push (根据提示可能需要加 -f)

## github编译如有报错，观察错误修改重现打包发布并提交

```