---
author: "arno"
date: 2024-07-10
linktitle: vscode实用功能
type:
- post
- posts
title: vscode实用功能
weight: 10
series:
- Hugo 101
---


## vscode 实用功能

### vscode测试获取go的环境变量

```TXT
  1.创建launch.json文件
  2.然后在项目目录中会自动创建.vscode的目录
  3.在.vscode目录下创建settings.json项目独立配置文件
  4.在settings.json中写入
    {
    "go.testEnvFile":  "${workspaceFolder}/.vscode/.env"
    }
  5. .vscode下创建.env文件
    APPID=22222222
    APPSECRET=1234567
  6.代码中如何获取环境变量
    var conf = &Config{}
    type Config struct {
      APPID string
      APPSECRET string
    }
    conf.APPID = os.Getenv("APPID")
    conf.APPSECRET = os.Getenv("APPSECRET")

```

### vscode快捷键 (mac版)

参考  <https://code.visualstudio.com/docs/setup/mac>

### 好用插件

vscode好用插件 [vscode好用插件](https://blog.csdn.net/u011262253/article/details/113879997)
