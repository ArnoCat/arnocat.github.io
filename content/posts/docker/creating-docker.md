---
author: "arno"
date: 2024-07-07
linktitle: docker
type:
- post
- posts
title: docker
weight: 10
series:
- Hugo 101
---

## Docker 常用命令
```
 # Docker常用命令
$ docker images  查看本地镜像文件

$ docker ps  查看正在运行的容器

$ docker ps –a  查看所有的容器

$ docker container exec -it container_id /bin/bash  进入到容器

$ exit  退出（docker容器中的命令，键入此命令，退回宿主机命令行）

$ docker version  查看版本

$ docker run -d -p 80:80 nginx  启动nginx容器

$ docker rmi imgage_id  删除镜像（docker imges查出来的结果）

$ docker rm 容器id  删除容器

$ docker stop 容器name  停止容器
```

## DockerFile编写



## 参考

https://blog.csdn.net/AkiraNicky/article/details/85775076

Docker官方网址: https://docs.docker.com/  英文地址

Docker中文网址: http://www.docker.org.cn/ 中文地址