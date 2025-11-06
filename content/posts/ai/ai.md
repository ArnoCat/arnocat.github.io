---
title: "ai"
date: 2020-09-15T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["ai"]
categories: ["ai"]
type: posts
author: "Me"
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

有很多球友对 AI 大模型应用开发感兴趣，这里简单分享一下相对具体的学习资料，从入门到实战。

👉 大模型应用开发基础

大模型应用开发的门槛其实不高，即使没有 AI 相关背景也没关系。大模型应用开发的首要任务是理解你将要使用的“工具”是什么。不必深入研究复杂的神经网络，但需要掌握以下核心概念：

1. 什么是大语言模型 (LLM)？ 了解其基本工作方式（输入 Prompt -> 输出 Completion）、主要能力（文本生成、理解、摘要、翻译、问答等）以及局限性（知识截止、幻觉等）。
2. 提示工程 (Prompt Engineering) 基础： 学习如何设计有效的 Prompt 来引导模型产生期望的输出。掌握基本技巧，如提供清晰指令、上下文、示例（Few-shot Learning）。这是应用开发中最直接、最高频的交互方式。
3. 嵌入 (Embeddings) 与向量数据库 (Vector Databases)： 理解文本如何被转换为向量（Embeddings），以及向量数据库（如 Milvus, Chroma, Weaviate, Pinecone, ES 向量搜索）在相似性搜索中的作用。这是实现 RAG 的关键技术。
4. 检索增强生成 (RAG - Retrieval-Augmented Generation)： 掌握 RAG 的核心思想——结合外部知识库（通过向量检索）来弥补 LLM 自身知识的不足或实现基于私有数据的问答。这是目前最主流的大模型应用模式之一。

推荐入门阅读（里面的概念不需要都搞懂）：

1. 技术人的大模型应用初学指南 - 淘宝：技术人的大模型应用初学指南
2. 只是文档灌 Dify？RAG 发展一篇文就入门！ - 腾讯：只是文档灌Dify？RAG发展一篇文就入门！
3. 一文讲透大模型应用开发 - 腾讯：一文讲透大模型应用开发：新时代技术核心竞争力人人都能掌握！

👉 Java 生态的 AI 开发框架

对于 Java 程序员， 重点学习 LangChain4j 和 Spring AI 这两个框架即可。

LangChain4j 于 2023 年初开始开发，正值 ChatGPT 热潮，当时 Java 领域缺乏与众多 Python 和 JavaScript LLM 库和框架对应的工具。LangChain4j 致力于简化在 Java 应用程序中集成 LLM 的过程，提供统一的 API、全面的工具箱和丰富的示例，帮助开发者快速构建强大的 LLM 应用程序。

Github 地址：GitHub - langchain4j/langchain4j: Java version of ...

学习资料：

1. LangChain4j 入门（译文，很基础）：Baeldung上有一篇介绍J...
2. 官方文档（介绍的非常详细）：Introduction | LangChain4j
3. Java 开发者 LLM 实战——使用 LangChain4j 构建本地 RAG 系统 - 京东技术：Java开发者LLM实战——使用LangChain4j构建本地RAG系统

Spring AI 是 Spring 生态系统中专注于人工智能（AI）领域的应用框架。它的目标是将 Spring 的设计理念（例如可移植性、模块化、依赖注入等）引入到 AI 的开发和应用中，使开发者能够以熟悉的方式快速构建和集成 AI 功能。同时，Spring AI 推广使用 POJO（Plain Old Java Objects）作为 AI 应用的核心构建模块，无需依赖复杂的专有结构。

GitHub 仓库：GitHub - spring-projects/spring-ai: An Application...

学习资料：

- Spring AI 中文教程：开源的 Spring AI 中文教程，Github 地址：<https://github.com/NingNing0111/spring-ai-zh-tutor>... ，语雀地址：Spring AI教程（更新中） · 语雀 。
- Spring 中文网对 Spring AI 的介绍：Spring-Ai - spring 中文网
- 官方文档（介绍的非常详细）：Spring AI

Spring AI Alibaba 基于 Spring AI 构建，是阿里云通义系列模型及服务在 Java AI 应用开发领域的最佳实践，提供高层次的 AI API 抽象与云原生基础设施集成方案，帮助开发者快速构建 AI 应用。更多介绍详见官方文档：Spring AI Alibaba 官网_快速构建 JAVA AI 应用。

👉 一些值得关注的 AI 项目（Java 语言开发）

最后，推荐几个还不错的 AI 项目：

1. chat-ollama: 这是一个整合langchain4j与spring ai的chat聊天的de...：一个整合 Langchain4j 与 Spring AI 的 Chat 聊天的 Demo，并整合 RAG。
2. GitHub - moyangzhan/langchain4j-aideepin: 基于AI的工作效... ：基于 Langchain4j 开发的 AI 的工作效率提升工具，接入了 DeepSeek、通义千问、文心一言、DALL-E 3 等大模型。
3. WGAI: 免费，本地化，开箱即用的WebAI在线训练识别平台&OCR&语音识别平台AI合集包含旦不... ：集成了图像识别、OCR（光学字符识别）、语音识别等技术，同时支持 AI 智能客服和语言模型功能，能够灵活、自主地部署和扩展，适配多种行业场景。
4. langchat: LangChat: Java生态下AI大模型产品解决方案，快速构建企业级AI知识... ：Java 生态下企业级 AIGC 项目解决方案，集成 RBAC 和 AIGC 大模型能力，帮助企业快速定制 AI 知识库、企业 AI 机器人。
5. GitHub - mymagicpower/AIAS: 免费，可商用，Java AI 人工智能一站式... ：免费可商用，Java AI 人工智能一站式解决方案。

👉学习建议

1. 看再多不如写一遍。务必动手实践，搭建环境，运行示例，尝试修改和扩展。
2. 初期不必过分深究模型内部原理，重点放在如何调用 API、使用框架、解决实际应用问题上。
3. AI 领域技术迭代迅速，框架更新快，官方文档永远是最新、最准确的信息来源。
4. RAG 是当前 LLM 应用落地的核心模式，务必深入理解其原理和实现流程。
5. 在实际应用中，需要考虑 LLM API 的调用成本、响应时间和 Token 消耗。
