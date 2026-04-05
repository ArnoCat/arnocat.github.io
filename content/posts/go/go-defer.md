---
title: "GO-defer"
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


## Go 每日一库之 defer

```go
func main() {
    f1()
    f2()
    f3()
}

func f1() {
 var err error
 defer fmt.Println(err)
 err = errors.New("error")
 return
}

func f2() {
 var err error
 defer func() {
  fmt.Println(err)
 }()
 err = errors.New("error")
 return
}

func f3() {
 var err error
 defer func(err error) {
  fmt.Println(err)
 }(err)
 err = errors.New("error")
 return
}
```

返回结果为 nil, error,nil

```txt
具体分析
如果 defer 使用的是变量的引用，它会在执行时读取当前值。
如果 defer 传递的是参数，参数值在 defer 定义时就被捕获。
f1:

defer fmt.Println(err) 捕获的是 err 当时的值（nil）。
即使 defer 在最后执行，它打印的是捕获时的值。

f2:

闭包持有对外部变量的引用，因此在闭包执行时，它读取的是变量的最新值。
这使得闭包可以反映变量的任何更新。

defer 定义了一个闭包，闭包在执行时访问的是 err 的当前值。
因此，defer 执行时，err 已经更新为 "error"。
f3:

defer 调用了一个匿名函数，并立即将 err 作为参数传递。
传递时，err 还是 nil。
所以，defer 执行时打印的是当时传递的 nil
```
