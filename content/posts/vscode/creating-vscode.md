---
title: "vscode实用功能"
date: 2024-07-10T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["vscode"]
categories: ["vscode"]
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
