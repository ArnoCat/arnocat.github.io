---
author: "arno"
date: 2024-08-19
linktitle: go-env
type:
- post
- posts/go
title: go-env
weight: 1
series:
- Hugo 101
---


## Go env

```SHELL
$ go env
# 编译内核
GOARCH='arm64'
# 文件库设置
# 当CGO_ENABLED=1， 进行编译时， 会将文件中引用libc的库（比如常用的net包），以动态链接的方式生成目标文件。
# 当CGO_ENABLED=0， 进行编译时， 则会把在目标文件中未定义的符号（外部函数）一起链接到可执行文件中。

$ go env -w CGO_ENABLED=0

```

### GOROOT和GOPATH

GOROOT 和 GOPATH 都是环境变量，其中 GOROOT 是我们安装go开发包的路径，而从Go 1.8版本开始，Go开发包在安装完成后会为 GOPATH 设置一个默认目录，并且在Go1.14及之后的版本中启用了Go Module模式之后，代码可以不写到GOPATH目录下面的src目录，所以就不需要再自己配置GOPATH了，使用默认的即可。

### GOPROXY

默认GoPROXY配置是：GOPROXY=<https://proxy.golang.org,direct，国内访问不到https://proxy.golang.org，所以换一个PROXY，>

使用 <https://goproxy.io> 或 <https://goproxy.cn>

```SHELL
go env -w GOPROXY=https://goproxy.cn,direct
```

### GO111MODULE

GO111MODULE 是 go modules 功能的开关. 在没有go modules机制时，go工程中对于第三方功能包的管理非常复杂，也非常专业，这就导致程序员在进行开发的时候，对于第三方功能包的管理很不方便

1. GO111MODULE=off，无模块支持，go命令行将不会支持module功能，寻找依赖包的方式将会沿用旧版本那种通过vendor目录或者GOPATH模式来查找。
2. GO111MODULE=on，go命令行将会支持module功能，寻找依赖包的方式将会沿用新版本那种通过go.mod文件来查找.GO111MODULE=on，模块支持，go命令行会使用modules，而一点也不会去GOPATH目录下查找。
3. GO111MODULE=auto，默认值，go命令行将会根据当前目录来决定是否启用module功能。这种情况下可以分为两种情形：
    1) 当前目录在GOPATH/src之外且该目录包含go.mod文件，开启模块支持。
    2) 当前文件在包含go.mod文件的目录下面。

```SHELL
go env -w GO111MODULE=on
```

注:
    > 在使用go modules时，GOPATH是无意义的，不过它还是会把下载的依赖存储在$GOPATH/pkg/mod 中
    > 也会把go install 的结果放在 $GOPATH/bin 中。
    > 当modules 功能启用时，依赖包的存放位置变更为$GOPATH/pkg
    > 允许同一个package多个版本并存，且多个项目可以共享缓存的module。

### 删除环境变量

go env -u NAME

### 设置环境变量

go env -w NAME=VALUE

### 环境变量

| 变量 ｜ 含义 |
-- | --
GOROOT | go 语言安装时所在的目录绝对路径
GOPATH | go 语言安装时所在的目录绝对路径
GOVERSION | go 语言版本
GOENV | Go 环境变量配置文件的位置。不能使用 ‘go env -w’ 设置。若设置 GOENV=off 将禁用默认配置文件的使用。
GOOS | 编译代码的操作系统名称（比如 linux,windows,darwin 等）
GOARCH | 编译代码的计算机处理器的架构（比如 amd64,386,arm 等）
GOPROXY | Go 模块代理地址（URL）
GOSUMDB | Go 模块要使用的校验和数据库的名称以及可选的公钥和URL。详见 <https://golang.org/ref/mod#authenticating>
GOPRIVATE, GONOPROXY, GONOSUMDB | 以 glob 模式表示的模块路径，多个使用逗号分隔。这些模式应该总是直接获取，不走代理拉去，且不参与校验。详见 <https://golang.org/ref/mod#private-modules>
GOCACHE | 存储编译后信息的缓存目录
GODEBUG | 启用各种调试工具。详见<https://go.dev/doc/godebug。>
GO111MODULE | 用于控制 Go Modules 的行为，可以设置为 on、off 或 auto。如果设置为 on，则 Go Modules 模式将被启用；如果设置为 off，则禁用 Go Modules 模式；如果设置为 auto，则根据当前目录下是否存在 go.mod 文件来判断是否启用 Go Modules 模式。在 Go 1.13 中，GO111MODULE 的默认值为 auto，即自动启用 Go Modules 模式。这意味着，如果在项目目录下存在 go.mod 文件，则会自动启用 Go Modules 模式，否则会使用传统的 GOPATH 模式。
GOINSECURE | 表示以 glob 模式表示的模块路径，多个使用逗号分隔。支持以不安全的 HTTP 连接下载模块
GOMAXPROCS | 用于控制 Go 程序中可同时执行的最大 CPU 数量。默认值为 CPU 核心数量。可以通过设置 GOMAXPROCS 的值来提高程序的并发性能。
