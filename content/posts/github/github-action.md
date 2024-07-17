---
author:
  name: "arno"
date: 2024-07-10
linktitle: github-action
type:
- post
- posts
title: github-action
weight: 10
series:
- Hugo 101
---


## git命令
#### 不应用当前分支的修改，单纯地切换分支
```
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
#### 应用当前分支的修改到切换的分支中
```
# 保存dev分支的修改到堆栈中
$ git stash

# 切换master分支
$ git checkout master

# 取回堆栈最新的修改
$ git stash pop

# 或者取回堆栈指定的修改
$ git stash apply stash@{0}

```
