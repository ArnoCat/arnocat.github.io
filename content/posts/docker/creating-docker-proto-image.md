---
author:
  name: "arno"
date: 2024-07-08
linktitle: docker-proto
type:
- post
- posts
title: docker-proto
weight: 10
series:
- Hugo 101
---

## 用go Makefile make -> docker image 生成proto （容器化用法）

### 为什么使用Makefile
在学习docker命令的时候，发现有人使用Makefile来存储操作，叼爆了。

因为最开始一个字一个字敲，因为这样会记住命令。但是熟悉了之后，每次想要做一些操作的时候就不得不
重复的输入以前的命令。当切换一个项目之后，又重复输入类似但又不完全相同的命令，仅仅通过history命令加速也比较慢。

### 先看实战Makefile示例 编译多个语种的proto文件

```
.PHONY: compile go java

BUILDER_CONTAINER=namely/protoc-all:1.51_2

compile: java go

go:
	docker run --rm -t -w /proto \
		-v ${PWD}:/proto ${BUILDER_CONTAINER} \
		-l go -o . -d proto

java:
	docker run --rm -t -w /proto \
		-v ${PWD}:/proto ${BUILDER_CONTAINER} \
		-l java -o java/ -d proto

```

## Makefile是什么
Makefile是make命令的规则配置文件。make命令是什么？

先来看看make在哪里

```
$ whereis make
make: /usr/bin/make /Library/Developer/CommandLineTools/usr/share/man/man1/make.1

```

可以看到make是bin下的以可执行文件。 

#### make 用户手册
```
MAKE(1)                                                          User Commands                                                         MAKE(1)

NAME
       make - GNU make utility to maintain groups of programs

SYNOPSIS
       make [OPTION]... [TARGET]...

DESCRIPTION
       The  make  utility will determine automatically which pieces of a large program need to be recompiled, and issue the commands to recom‐
       pile them.  The manual describes the GNU implementation of make, which was written by Richard Stallman and Roland McGrath, and is  cur‐
       rently  maintained  by Paul Smith.  Our examples show C programs, since they are very common, but you can use make with any programming
       language whose compiler can be run with a shell command.  In fact, make is not limited to programs.  You can use  it  to  describe  any
       task where some files must be updated automatically from others whenever the others change.

       To prepare to use make, you must write a file called the makefile that describes the relationships among files in your program, and the
       states the commands for updating each file.  In a program, typically the executable file is updated from object  files,  which  are  in
       turn made by compiling source files.

       Once a suitable makefile exists, each time you change some source files, this simple shell command:

              make

       suffices  to  perform  all necessary recompilations.  The make program uses the makefile description and the last-modification times of
       the files to decide which of the files need to be updated.  For each of those files, it issues the commands recorded in the makefile.

       make executes commands in the makefile to update one or more target names, where name is typically a  program.   If  no  -f  option  is
       present, make will look for the makefiles GNUmakefile, makefile, and Makefile, in that order.

       Normally  you  should  call  your makefile either makefile or Makefile.  (We recommend Makefile because it appears prominently near the
       beginning of a directory listing, right near other important files such as README.)  The first name checked, GNUmakefile, is not recom‐
       mended for most makefiles.  You should use this name if you have a makefile that is specific to GNU make, and will not be understood by
       other versions of make.  If makefile is '-', the standard input is read.

       make updates a target if it depends on prerequisite files that have been modified since the target was last modified, or if the  target
       does not exist.
```
大致是说make是GNU中维护和组织程序的。比如我们的C语言编译， 再比如源码安装某些软件，比如nginx的时候。那么GNU是什么鬼？

GNU(GNU's Not Unix)是一个类Unix系统， 目标是创建一套完全自由的操作系统。在Linux出现之前，GNU已经完成了除了内核之外大部分的软件。Linux出现之后，与GNU结合变成GNU/Linux。
严格的说，Linux只代表Linux内核，其他Linux软件称为Linux发行版。但由于商业发行商坚持称呼Linux, 虽然已经更名为GNU/Linux, 但大家依然叫Linux.

```
## 比如我的本机Ubuntu
~ ❯ uname
Linux
~ ❯ uname -a
Linux ryan-computer 4.18.0-20-generic #21~18.04.1-Ubuntu SMP Wed May 8 08:43:37 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux

## 大部分基于Debian的docker镜像
airflow@88e36c088b81:~$ cat /etc/issue
Debian GNU/Linux 9 \n \l

## RedHat
[root@data-docker001 docker-airflow]# cat /etc/redhat-release 
CentOS Linux release 7.4.1708 (Core) 
[root@data-docker001 docker-airflow]# uname -a                
Linux data-docker001 3.10.0-693.2.2.el7.x86_64 #1 SMP Tue Sep 12 22:26:13 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux

```

#### make 基本用法
```
make target

```

### Makefile基本语法

在当前目录创建一个叫做Makefile的文件。

#### 声明变量

简单的变量赋值，比如声明name
```
$ name=arno
```
#### 声明规则Rule
Makefile文件由一系列规则（rules）构成。每条规则的形式如下。
```
<target> : <prerequisites> 
[tab]  <commands>

```
target 目标
prerequisites 前置条件
tab command必须由tab隔开
commands 只能有一行的shell

#### 防止target和文件名一样

当我们设置的target和当前目录下的文件名一样的话，target会被忽略，所以，通常，我们把target都用做phony target。
```
.PHONY: build start push
```
表示， build start push 这3个target，不检查当前目录下的文件，直接执行命令。

#### Docker构建用的指令
```
NAME = ryan/airflow
VERSION = 1.10.4

.PHONY: build start push

build:  build-version

build-version:
        docker build -t ${NAME}:${VERSION}  .

tag-latest:
        docker tag ${NAME}:${VERSION} ${NAME}:latest

start:
        docker run -it --rm ${NAME}:${VERSION} /bin/bash

push:   build-version tag-latest
        docker push ${NAME}:${VERSION}; docker push ${NAME}:latest
```

make build && make start && make push
### Makefile的每个命令的作用

### docker run images 里面镜像每个命令的作用
```
gen-proto生成grpc和protobuf@即
 
用法：gen proto-f my-service.proto-l go
 
选项：
-h、 --help显示帮助
-f FILE要生成的原型源文件
-d DIR扫描给定目录中的所有原始文件
-l 要生成的语言（go ruby csharp java python objc gogo php node typescript web cpp descriptor_set scala）
-o DIRECTORY生成文件的输出目录。将自动创建。
-i 额外包括
--lint CHECKS启用linting protoc lint（CHECKS是可选的-请参阅https://github.com/ckaznocha/protoc-gen-lint#optional-检查）
--with gateway生成grpc网关文件（实验）。
--使用文档FORMAT生成文档（FORMAT是可选的-请参阅https://github.com/pseudomuto/protoc-gen-doc#invoking-插件）
--使用pyi生成mypy存根文件（.ppy文件）-请参阅https://github.com/nipunn1313/mypy-protobuf
--使用rbi生成Sorbet类型声明文件（.rbi文件）-请参阅https://github.com/coinbase/protoc-gen-rbi
--使用typescript生成typescript声明文件（.d.ts文件）-请参阅https://github.com/improbable-eng/ts-protoc-gen#readme
--使用验证器为（gogogcppjavapython）生成验证-请参阅https://github.com/envoyproxy/protoc-gen-validate
--validator source relative使protoc gen的输出目录验证“source relative”-请参阅https://github.com/envoyproxy/protoc-gen-validate#go
--go source relative Make go导入路径“source_relative”-请参阅https://github.com/golang/protobuf#parameters
--go模块前缀指定要从导入路径中删除的模块前缀-请参阅https://developers.google.com/protocol-buffers/docs/reference/go-generated#invocation
--go包映射映射proto导入到go导入路径
--go plugin micro用go micro替换go gRPC插件
--go原型验证器生成go原型验证-请参阅https://github.com/mwitkow/go-proto-validators
--go grpc需要未实现的服务器为未来的兼容性生成具有未实现服务器的go grpc服务-https://github.com/grpc/grpc-go/tree/master/cmd/protoc-gen-go-grpc#future-校对服务
--不包括谷歌不包括谷歌原型
--descr include imports当使用--descriptor_set_out时，还包括集合中输入文件的所有依赖项，以便集合是自包含的
--descr include source info使用--descriptor_set_out时，不要从FileDescriptorProto中剥离SourceCodeInfo。这导致
更大的描述符，包括关于源文件中每个decl的原始位置的信息
作为周围的评论。
--descr filename与-l descriptor_set一起使用时描述符proto的文件名。默认为descriptor_set.pb
--csharp_opt传递给protoc以自定义csharp代码生成的选项。
--scala_opt传递给protoc以自定义scala代码生成的选项。
--with swagger json名称使用with--with gateway标志。生成的swagger文件将使用JSON名称而不是protobuf名称。
（已弃用。请使用--with openapi json名称）
--with openapi json name使用with--with gateway标志。生成的OpenAPI文件将使用JSON名称，而不是protobuf名称。
--generate unbound methods与--with gateway标志一起使用。即使对于没有任何HttpRule注释的方法，也要生成HTTP映射。
--js-out此选项覆盖grpc节点和grpc web代码生成中的“js_out=”参数。默认为'import_style=commonjs'。
--grpc out此选项允许使用grpc节点和grpc web代码生成覆盖“grpc_out=”参数的左半部分（冒号之前）。选项为：generate_package_definition、grpc_js或grpc（自2021年4月起取消认证）。默认为grpc_js。
--grpc web out此选项覆盖grpc web代码生成中的“grpc-web_out=”参数。默认为“import_style=typescript”。
--ts_opt传递给protoc以自定义typescript代码生成的选项。看见https://github.com/stephenh/ts-proto#supported-选项--ts_opt useOptionals=消息将评估为--ts_proto_opt=useOptionals=messages
```







## 参考

 https://www.cnblogs.com/woshimrf/p/make-docker.html

 https://www.ruanyifeng.com/blog/2015/02/make.html

 https://blog.csdn.net/icycolawater/article/details/77921688 

