---
title: "github-action"
date: 2024-07-10T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["github"]
categories: ["github"]
type: posts
author: "arno"
description: "围绕 Git 常见分支切换和 stash 使用场景，整理一份高频命令速查。"
summary: "适合日常开发中快速查阅：如何在切换分支时暂存修改、恢复工作区以及查看 stash 差异。"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
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


## git命令

### 不应用当前分支的修改，单纯地切换分支

```SHELL
# 保存dev分支的修改到堆栈中
$ git stash

# 切换master分支
$ git checkout master

# 切回dev分支
$ git checkout dev

# 获取堆栈列表
$ git stash list

# 对比本地与堆栈条目差异
$ git stash show stash@{0}

# 对比本地与堆栈条目详细代码差异
$ git stash show stash@{0} -p

# 取回堆栈最新的修改
$ git stash
```

### 应用当前分支的修改到切换的分支中

```SHELL
# 保存dev分支的修改到堆栈中
$ git stash

# 切换master分支
$ git checkout master

# 取回堆栈最新的修改
$ git stash pop

# 或者取回堆栈指定的修改
$ git stash apply stash@{0}

```
