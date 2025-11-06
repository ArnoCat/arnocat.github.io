---
title: "GO每日一库之go基础"
date: 2024-07-09T11:30:03+00:00
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


## Go 每日一库之go基础

### 1. var _ Interface = (*Type)(nil)

在Go语言中，var _ Interface = (*Type)(nil) 是一种常见的惯用法，用于确保某个类型 (Type) 实现了某个接口 (Interface)。它的作用是，在编译时强制检查类型实现接口的情况。

#### 接口声明：首先你需要声明一个接口。例如

```go
type Interface interface {
    Method1()
    Method2()
}
```

#### 类型声明并实现接口方法：然后你声明一个类型，并实现接口中的所有方法。例如

```go
type Type struct{}

func (t *Type) Method1() {
    // 实现 Method1
}

func (t *Type) Method2() {
    // 实现 Method2
}
```

#### 接口实现验证：最后使用 var _ Interface = (*Type)(nil) 来验证 Type 是否实现了 Interface 接口

```go
var _ Interface = (*Type)(nil)
```

这一行代码的作用是在编译时确保 *Type 实现了 Interface 接口。如果*Type 没有实现 Interface 中的所有方法，编译器会报错。
为什么使用这种方式？
这种方式的好处是显而易见的：

编译时检查：它在编译时就能发现类型没有完全实现接口的错误。
文档化：它清晰地表明了 Type 需要实现某个接口，使代码更加自文档化。
避免运行时错误：通过编译时检查，可以避免某些运行时才会发现的问题。

#### 完整示例

```go
package main

import "fmt"

// 定义接口
type Interface interface {
    Method1()
    Method2()
}

// 编译时检查 Type 是否实现了 Interface
var _ Interface = (*Type)(nil)

// 定义类型并实现接口方法
type Type struct{}

func (t *Type) Method1() {
    fmt.Println("Method1 implemented")
}

func (t *Type) Method2() {
    fmt.Println("Method2 implemented")
}

func main() {
    var t Interface = &Type{}
    t.Method1()
    t.Method2()
}

```
