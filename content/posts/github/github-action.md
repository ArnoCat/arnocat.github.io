---
title: "github-action"
date: 2024-07-10T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["github"]
categories: ["github"]
type: posts
author: "arno"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
canonicalURL: "https://canonical.url/to/page"
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
cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
editPost:
    URL: "https://github.com/<path_to_repo>/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
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
