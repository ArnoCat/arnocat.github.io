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

1. 实现http.ResponseWriter接口，通过Mock HTTP Response模拟HTTP响应
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
2. 真实创建HTTP测试服务，创建后就立马监听，通过http.Get(ts.URL)、http.Post(ts.URL)等发起真实HTTP请求

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

3. 真实创建HTTP测试服务，创建后可以通过ts来说设置相关参数，并需要通过StartTLS()启动HTTP测试服务，再进行HTTP请求测试
ts := httptest.NewUnstartedServer()
ts.EnableHTTP2 = true: 设置参数
ts.StartTLS():启动
另外，注意真实创建HTTP测试服务，需要在UT结束时候关闭打开的资源，包括套接字资源:defer ts.Close()以及defer res.Body.Close()。


4. 使用mock的方式，mockhttp接口

原理： 例如调用微软ChatGpt的http方法的时候，采用接口的形式去调用DoTimeOut方法
等到使用 testify 去进行单元测试的时候，会将DoTimeOut方法mock，去调用mock方法。

eg:
```
	var _ agent.ChatAgents = (*ChatGPT)(nil)

	var _ HTTPClient = (*fasthttp.Client)(nil)

	type ChatGPT struct {
		client HTTPClient
	}

	type HTTPClient interface {
		DoTimeout(req *fasthttp.Request, resp *fasthttp.Response, timeout time.Duration) error
	}

	func NewChatGPT(client HTTPClient) *ChatGPT {
		return &ChatGPT{
			client: client,
		}
	}

	func NewDefaultChatAgent() *ChatGPT {
		return NewChatGPT(http.NewClient())
	}

	func (c *ChatGPT) Chat(ctx common.Context, chatReq *agent.ChatReq) (*agent.ChatRsp, error) {
	endpoint, apiKey := c.endpoint(ctx)

	req := fasthttp.AcquireRequest()
	req.SetRequestURI(endpoint)
	req.Header.SetMethod(fasthttp.MethodPost)
	req.Header.SetContentType(contentTypeJson)
	req.Header.Set("api-key", apiKey)
	req.SetBodyRaw([]byte(chatReq.Body))
	resp := fasthttp.AcquireResponse()
	err := c.client.DoTimeout(req, resp, reqTimeout)
	if err != nil {
		return nil, err
	}
	fasthttp.ReleaseRequest(req)
	defer fasthttp.ReleaseResponse(resp)

	if resp.StatusCode() != fasthttp.StatusOK {
		return nil, fmt.Errorf("unexpected status code %d", resp.StatusCode())
	}

	if len(resp.Body()) == 0 {
		return nil, nil
	}

	return &agent.ChatRsp{
		Result: string(resp.Body()),
	}, nil
}
```

test eg:

```
// MockHTTPClient is a mock implementation of the HTTPClient interface
type MockHTTPClient struct {
	mock.Mock
}

func (m *MockHTTPClient) DoTimeout(req *fasthttp.Request, resp *fasthttp.Response, timeout time.Duration) error {
	args := m.Called(req, resp, timeout)
	return args.Error(0)
}

func TestChatGPT(t *testing.T) {
	mockClient := new(MockHTTPClient)
	chatGPT := NewChatGPT(mockClient)

	resp := &fasthttp.Response{}
	resp.SetStatusCode(fasthttp.StatusOK)
	resp.SetBodyString(`{"result": "mocked response"}`)

	// Set up the mock expectation
	mockClient.On("DoTimeout", mock.Anything, mock.Anything, time.Second*10).Return(nil).Run(func(args mock.Arguments) {
		// Simulate setting response body
		argResp := args.Get(1).(*fasthttp.Response)
		argResp.SetStatusCode(fasthttp.StatusOK)
		argResp.SetBodyString("mocked response")
	})

	ctx := common.Context{}
	chatReq := &agent.ChatReq{Body: `{"message": "test"}`}

	got, err := chatGPT.Chat(ctx, chatReq)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	var expected *agent.ChatRsp
	err = json.Unmarshal(resp.Body(), &expected)
	if err != nil {
		t.Errorf("json Unmarshal %v", err)
	}
	assert.Equal(t, got, expected)

	// Assert that the expectations were met
	mockClient.AssertExpectations(t)
}
```

### GenericContainer


## 参考：

https://darjun.github.io/2021/08/11/godailylib/testify/

https://tkstorm.com/2020/10/go-httptest-%E5%9C%A8%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E4%B8%AD%E8%BF%9B%E8%A1%8Chttp%E6%A8%A1%E6%8B%9F%E6%B5%8B%E8%AF%95/

https://learn.microsoft.com/zh-cn/azure/ai-services/openai/chatgpt-quickstart?tabs=command-line%2Cpython-new&pivots=rest-api