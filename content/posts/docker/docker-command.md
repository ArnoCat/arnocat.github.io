---
author: "arno"
date: 2024-08-11
linktitle: docker常用命令
type:
- post
- posts/go
title: docker常用命令
weight: 1
series:
- Hugo 101
---


## docker常用命令

```SHELL
# docker拉取镜像
$ docker pull xxx
# docker 查看镜像
$ docker images
# 查找镜像
$ docker search xxx
# 删除镜像
$ docker rmi xxx

# 查看我们正在运行的容器
$ docker ps
# 查看所有的容器命令如下:
$ docker ps -a

# 使用 ubuntu 镜像启动一个容器，并且以命令行模式进入该容器:
# -i: 交互式操作。
# -t: 终端。
# /bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。
$ docker run -it ubuntu /bin/bash
# -d 指定容器的运行模式
$ docker run -itd --name ubuntu-test ubuntu /bin/bash

# docker start 启动一个已停止的容器
$ docker start b750bbbcfd88

# 停止一个容器
$ docker stop <容器 ID>

# 进入容器
# docker attach 不推荐
# docker exec：推荐大家使用 docker exec 命令，因为此命令会退出容器终端，但不会导致容器的停止
$ docker exec -it 243c32535da7 /bin/bash

# 删除容器
$ docker rm <容器ID>
```
