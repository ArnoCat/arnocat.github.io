---
title: "vscode实用功能"
date: 2024-07-10T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["vscode"]
categories: ["vscode"]
type: posts
author: "arno"
description: "记录 VS Code 在 Go 开发中的一些实用能力，包括测试环境变量配置和常用插件。"
summary: "适合新项目初始化时快速参考：如何给 Go 测试注入环境变量、组织 `.vscode` 配置以及补充常用插件。"
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
