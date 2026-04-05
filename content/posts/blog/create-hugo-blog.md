---
title: "新建一个hugo博客"
date: 2022-07-05T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["blog"]
categories: ["blog"]
type: posts
author: "arno"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "从零创建 Hugo 博客并发布到 GitHub Pages 的基础流程记录。"
summary: "覆盖 GitHub 仓库创建、Hugo 安装、主题接入、本地预览和 `docs/` 发布等完整建站步骤。"
featured: true
disableHLJS: false # to disable highlightjs
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
---

## Introduction

从零开始创建一个hugo项目并且部署到github

环境要求：
下载go 和 git

## 创建github库

1. 打开github，创建一个库
2. 输入项目名，要与 Github 用户名一致。比如我的是 arnocat，那么输入的 Repository name 就是 arnocat.github.io，README 不要勾选上。
3. setting页面选择main / docs文件夹，然后save

### 多账号github搭建 （此处自选）

```SHELL
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

```SHELL
## 我用的官方最新版，没有用brew install hugo
$ CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
$ hugo version

```

## 新建hugo网站

```SHELL
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
