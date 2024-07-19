---
author: "arno"
date: 2024-07-10
linktitle: go-viper
type:
- post
- posts/go
title: go-viper
weight: 10
series:
- Hugo 101
---


# Go 每日一库之 viper

viper 是一个配置解决方案，拥有丰富的特性：

支持 JSON/TOML/YAML/HCL/envfile/Java properties 等多种格式的配置文件；
·可以设置监听配置文件的修改，修改时自动加载新的配置；
·从环境变量、命令行选项和io.Reader中读取配置；
·从远程配置系统中读取和监听修改，如 etcd/Consul；
·代码逻辑中显示设置键值。

## 快速使用
### 安装：
```
$ go get github.com/spf13/viper
```
#### 示例
```
package main

import (
  "fmt"
  "log"

  "github.com/spf13/viper"
)

func main() {
  <!-- viper.SetConfigName("config")
  viper.SetConfigType("toml")
  viper.AddConfigPath(".") 试过带路径的不适合部署-->

  viper.SetConfigFile("config.yml")
	viper.SetConfigType("yaml")

  viper.SetDefault("redis.port", 6381)

  if err := viper.ReadInConfig(); err != nil {
		return nil, err
	}

	var cfg Config
	if err := viper.Unmarshal(&cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}
```
#### Unmarshal
viper 支持将配置Unmarshal到一个结构体中，为结构体中的对应字段赋值。
<font color=red>切记要大写！！！</font>

```
package main

import (
  "fmt"
  "log"

  "github.com/spf13/viper"
)

type Config struct {
  AppName  string
  LogLevel string

  MySQL    MySQLConfig
  Redis    RedisConfig
}

type MySQLConfig struct {
  IP       string
  Port     int
  User     string
  Password string
  Database string
}

type RedisConfig struct {
  IP   string
  Port int
}

func main() {
  viper.SetConfigName("config")
  viper.SetConfigType("toml")
  viper.AddConfigPath(".")
  err := viper.ReadInConfig()
  if err != nil {
    log.Fatal("read config failed: %v", err)
  }

  var c Config
  viper.Unmarshal(&c)

  fmt.Println(c.MySQL)
}
```

#### 解决viper读取yaml配置存在下划线时无法映射
yaml示例:
```
mysql:
	rds_host: "rds_xxxxxx.com"
	rds_port: 3306

```
config.go部分内容如下:
```
type Mysql struct {
	RdsHost string `yaml:"rds_host" mapstructure:"rds_host"`
	RdsPort int    `yaml:"rds_port" mapstructure:"rds_port"`
}
```
## 参考

[go每日一库之viper]https://darjun.github.io/2020/01/18/godailylib/viper/