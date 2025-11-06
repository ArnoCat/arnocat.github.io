---
title: "go-escape-analysis"
date: 2024-08-19T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["go"]
categories: ["go"]
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


## Go escape analysis

### 什么叫逃逸分析

```text
在 C 语言中，可以使用 malloc 和 free 手动在堆上分配和回收内存。Go 语言中，堆内存是通过垃圾回收机制自动管理的，无需开发者指定。那么，Go 编译器怎么知道某个变量需要分配在栈上，还是堆上呢？编译器决定内存分配位置的方式，就称之为逃逸分析(escape analysis)。逃逸分析由编译器完成，作用于编译阶段。

```

### 什么情况下会进行逃逸 <https://geektutu.com/post/hpg-escape-analysis.html>

1. 指针逃逸-在函数中创建了一个对象，返回了这个对象的指针。这种情况下，函数虽然退出了，但是因为指针的存在，对象的内存不能随着函数结束而回收，因此只能分配在堆上。
2. 闭包逃逸-闭包中包含了一个指向堆对象的指针，因此只能分配在堆上。
3. interface{} 动态类型逃逸
4. 栈空间不足逃逸-操作系统对内核线程使用的栈空间是有大小限制的，64 位系统上通常是 8 MB。可以使用 ulimit -a 命令查看机器上栈允许占用的内存的大小。

### 怎么进行逃逸分析

go build -gcflags=-m xxx.go

### 代码层面怎么优化-如何利用逃逸分析提升性能

传值 VS 传指针

传值会拷贝整个对象，而传指针只会拷贝指针地址，指向的对象是同一个。传指针可以减少值的拷贝，但是会导致内存分配逃逸到堆中，增加垃圾回收(GC)的负担。在对象频繁创建和删除的场景下，传递指针导致的 GC 开销可能会严重影响性能。

一般情况下，对于需要修改原对象值，或占用内存比较大的结构体，选择传指针。对于只读的占用内存较小的结构体，直接传值能够获得更好的性能。
