---
title: Article Title
date: 2024-07-18T14:44:54+08:00
lastmod: 2024-07-18T14:44:54+08:00
author: Author Name
linktitle: go-test
type:
- post
- posts/go
title: go-test
# avatar: /img/author.jpg
# authorlink: https://author.site
# cover: /img/cover.jpg
# images:
#   - /img/cover.jpg
categories:
  - category1
tags:
  - tag1
  - tag2
# nolastmod: true
draft: false
---


## go基础之Testify单元测试

### 1. 简单使用
```
package main

import (
    "testing"
    "github.com/stretchr/testify/assert"
)

func TestSomething(t *testing.T) {
    // assert equality
    assert.Equal(t, 123, 123, "they should be equal")

    // assert inequality
    assert.NotEqual(t, 123, 456, "they should not be equal")

    // assert for nil (good for errors)
    assert.Nil(t, object)

    // assert for not nil (good when you expect something)
    if assert.NotNil(t, object) {
        // now we know that object isn't nil, we are safe to make
        // further assertions without causing any errors
        assert.Equal(t, "Something", object.Value)
    }
}
```

### 2.httptest
1.实现http.ResponseWriter接口，通过Mock HTTP Response模拟HTTP响应
w := httptest.NewRecorder()
req := httptest.NewRequest()
resp := handler(w, req)
```
func TestRespRecorder(t *testing.T) {
	// define handler
	handler := func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "<html><body>Hello World!</body></html>")
	}
	// define request
	req := httptest.NewRequest("GET", "http://httpbin.org/ip", nil)
	t.Logf("%+v", req)
	// new an recorder impl http.ResponseWriter
	w := httptest.NewRecorder()
	// handle
	handler(w, req)
	// get fake http response
	resp := w.Result()
	body, _ := ioutil.ReadAll(resp.Body)
	t.Logf("%+v", resp)
	t.Log(string(body))
}

```
2.真实创建HTTP测试服务，创建后就立马监听，通过http.Get(ts.URL)、http.Post(ts.URL)等发起真实HTTP请求
ts := httptest.NewServer()
ts := httptest.NewTLSServer()

```
func TestNormalHTTPServer(t *testing.T) {
	// 创建一个普通HTTP1.1测试服务
	handler := func(w http.ResponseWriter, r *http.Request) {
		// json header
		w.Header().Set("Content-Type", "application/json")
		// json回包
		m := map[string]interface{}{
			"id":   100,
			"name": "clark",
			"likes": []string{"play game", "watch tv", "read book",},
		}
		jdt, err := json.Marshal(m)
		if err != nil {
			t.Fatal(err)
		}
		w.Write(jdt)
		// fmt.Fprintf(w, "%s", jdt)
	}
	ts := httptest.NewServer(http.HandlerFunc(handler))
	defer ts.Close()

	// 发起http请求
	res, err := http.Get(ts.URL)
	if err != nil {
		log.Fatal(err)
	}
	t.Logf("%s", res.Header)
	t.Logf("%s", res.Request.URL)

    // http响应处理
	greeting, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	t.Logf("%s", greeting)
}

```

3.真实创建HTTP测试服务，创建后可以通过ts来说设置相关参数，并需要通过StartTLS()启动HTTP测试服务，再进行HTTP请求测试
ts := httptest.NewUnstartedServer()
ts.EnableHTTP2 = true: 设置参数
ts.StartTLS():启动
另外，注意真实创建HTTP测试服务，需要在UT结束时候关闭打开的资源，包括套接字资源:defer ts.Close()以及defer res.Body.Close()。

### GenericContainer


## 参考
https://darjun.github.io/2021/08/11/godailylib/testify/