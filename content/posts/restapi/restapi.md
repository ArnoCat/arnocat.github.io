---
author: "arno"
date: 2024-09-02
linktitle: restapi
type:
- post
- posts
title: restapi
weight: 10
series:
- Hugo 101
---

## swagger gin stoplight 使用

### 安装

```bash
go get -u github.com/swaggo/swag/cmd/swag
# 在macOS中安装 swag需要执行如下命令：
mv $GOPATH/bin/swag /usr/local/go/bin
```

### 检测是否安装成功

```bash
swag -v
swag version v1.16.3

```

### 安装gin-swagger扩展

```bash
go get -u -v github.com/swaggo/gin-swagger
go get -u -v github.com/swaggo/files
go get -u -v github.com/alecthomas/template

```

### 使用

- 使用gin-swagger为你的代码自动生成接口文档，一般需要下面三个步骤：

    1.按照swagger要求给接口代码添加声明式注释。
    2.使用swag工具扫描代码自动生成api接口文档数据。
    3.使用gin-swagger渲染在线接口文档页面。

#### 1.添加注释

- 1.1先给main.go添加注释：

```go
// @title    API 文档
// @version   0.0.7
// @description  swagger 文档示例
//
// @schemes   http
// @host    localhost:24724
// @BasePath   /livetranslator
// @tag.name   内部接口
// @tag.description 内部接口
func main() {
 c, err := ctx.New()
 if err != nil {
  log.WithError(err).Panic("context setup failed.")
 }
 server.New(c).Serve()
}

```

- 1.2然后在api处添加swagger代码：

```go

func setupCommonEndpoints(c *ctx.Context, r *gin.Engine) {
 ok := func(c *gin.Context) { c.Status(http.StatusOK) }
 // Kubernetes
 r.GET("/healthy", ok)
 r.GET("/ready", ok)

// Swagger
 r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
 log.Infof("api-swagger: http://localhost:%s%s", c.Cfg.Server.Port, "/swagger/index.html")

 api := r.Group("/livetranslator")

 setupGroupApiEndpoints(c, api)
}

func setupGroupApiEndpoints(c *ctx.Context, api *gin.RouterGroup) {
 api.GET("/version", version.GetVersion(c))
 api.POST("/translate/text", translate.TextTranslate(c))
 api.POST("/moderate/image", moderation.ImageModerate(c))
 api.POST("/moderate/text", moderation.TextModerate(c))
 api.POST("/asa/sync", asa.SyncQimaData(c))
}
```

- 1.3最后api上添加如下代码注释：

```go
// @Summary  语种翻译
// @Description 语种翻译
// @id    text-translate
// @Tags   翻译
// @Accept   json
// @Produce  json
// @Param   req body  translate.TextTranslateReq true "语种翻译请求"
// @Success  200 {object} translate.TextTranslateResp
// @Failure  400 {object} ugin.Response "code 1000 , msg: Bad Request"
// @Failure  500 {object} ugin.Response "code 1001 , msg: invoke error"
// @Router   /translate/text [post]
func TextTranslate(cc *common.Context) gin.HandlerFunc {
 return func(c *gin.Context) {
  json := &translate.TextTranslateReq{}
  if err := api.Bind(c, &json); err != nil {
   ugin.BadRequestError(c, ugin.ReqParamErr, ugin.MsgReqParamErr)
   return
  }
  if len(json.From) == 0 || len(json.Content) == 0 {
   ugin.BadRequestError(c, ugin.ReqParamErr, ugin.MsgReqParamErr)
   return
  }
  resp, err := cc.GetEveClient().TextTranslate("microsoft", json)
  if err != nil {
   logrus.WithError(err).Errorf("invoke fail")
   ugin.InternalError(c, ugin.InvokeErr, ugin.MsgInvokeErr)
   return
  }
  ugin.Success(c, resp)
 }
}

```

#### 2.生成接口文档数据

```bash
swag fmt
swag init
# 如果main.go 名字换了，这里也要换成 swag init -g xxx.go
### 特别注意: 最好是将这个main.go放在主目录下

```

#### 3.渲染在线接口文档

然后在项目代码中注册路由的地方按如下方式引入gin-swagger相关内容：

```go
import (
 "github.com/gin-gonic/gin"
 "github.com/swaggo/files"
 ginSwagger "github.com/swaggo/gin-swagger"
 _ "xxx/xxx/swag/docs" // 千万不要忘了导入把你上一步生成的docs
)
//添加swagger访问路由
r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
```

#### 4.启动服务

#### 5.github安装自动将swag.yml推送到stoplight.io的hub上面去

## 参考

### API Design

1.<https://docs.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules>
2.<https://stoplight.io/api-style-guides-guidelines-and-best-practices?utm_source=github&utm_medium=spectral&utm_campaign=docs>
3.<https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html>
4.<https://apistylebook.stoplight.io/docs/url-guidelines>

### Design-First vs Code-First

1.<https://blog.stoplight.io/api-first-api-design-first-or-code-first-which-should-you-choose>
2.<https://swagger.io/blog/code-first-vs-design-first-api/>

### RESTful style

1.<https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/>
2.<https://simi.studio/restful-api-best-practices/>
3.<https://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html>
4.<https://apistylebook.stoplight.io/>
