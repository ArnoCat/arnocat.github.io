---
title: "Codex CLI 通知配置（macOS 实战指南）"
date: 2026-04-05T10:30:00+08:00
tags: ["ai", "workflow"]
categories: ["vibecoding"]
type: posts
author: "arno"
description: "一套适合 macOS 的 Codex CLI 任务完成通知方案，覆盖提示音、系统通知与摘要展示。"
summary: "通过 `terminal-notifier` 和 `jq` 给 Codex CLI 增加任务完成提醒，让长时间分析和自动执行结束后能被及时感知。"
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
disableHLJS: false
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

🧠 Codex CLI 通知配置（macOS 实战指南｜精简增强版）

在使用 Codex CLI 做开发时，经常会遇到一个问题：

👉 任务跑完了，但你不知道它什么时候结束

尤其是：

重构代码
跑 full-auto
长时间分析项目

所以配置一个“任务完成通知”非常有必要。

这篇文章教你用一套简单但实用的方案：

✅ 声音提醒 + 系统通知 + 内容摘要 + 智能标题

🚀 最终效果

当 Codex 完成任务时：

🔊 播放提示音
🖥 弹出 macOS 通知
🧠 显示 AI 的最后输出摘要
⏰ 带时间
🏷 自动识别类型（成功 / 修改 / 错误）

示例：

🔧 Codex 修改 [14:32:10]
Refactored user service and updated validation logic...
⚙️ 一、安装依赖

需要两个工具：

brew install terminal-notifier jq

说明：

terminal-notifier：mac 通知工具
jq：解析 Codex 传入的 JSON
📁 二、配置 Codex

编辑配置文件：

~/.codex/config.toml

加入：

notify = ["bash", "/Users/arno/.codex/notify.sh"]
📜 三、创建通知脚本

创建文件：

mkdir -p ~/.codex
nano ~/.codex/notify.sh

写入以下内容👇

#!/bin/bash

JSON="$1"

# ===== 解析消息 =====
MSG=$(echo "$JSON" | jq -r '."last-assistant-message" // "Codex done"')

# ===== 截断（避免过长）=====
MSG=${MSG:0:150}

# ===== 时间 =====
TIME=$(date "+%H:%M:%S")

# ===== 智能标题（根据内容判断类型）=====
TITLE="Codex"

if echo "$MSG" | grep -qiE "error|fail|failed"; then
  TITLE="❌ Codex 错误"
elif echo "$MSG" | grep -qiE "refactor|update|change"; then
  TITLE="🔧 Codex 修改"
elif echo "$MSG" | grep -qiE "done|complete|success"; then
  TITLE="✅ Codex 完成"
else
  TITLE="📌 Codex 更新"
fi

# ===== 播放声音 =====
afplay /System/Library/Sounds/Glass.aiff

# ===== 发送通知 =====
terminal-notifier \
  -title "$TITLE [$TIME]" \
  -message "$MSG"
🔐 四、添加执行权限
chmod +x /Users/arno/.codex/notify.sh
🔄 五、重启 Codex
Ctrl + C
codex
🧪 六、测试通知

可以手动测试：

bash /Users/arno/.codex/notify.sh '{"last-assistant-message":"测试成功"}'
🧠 七、配置说明
1️⃣ 为什么要解析 JSON？

Codex 在任务完成时会传入一个 JSON，例如：

{
  "type": "agent-turn-complete",
  "last-assistant-message": "Refactored user service..."
}

我们通过 jq 提取：

."last-assistant-message"
2️⃣ 为什么要截断？

AI 输出可能很长：

MSG=${MSG:0:150}

避免通知太长影响阅读体验。

3️⃣ 智能标题怎么工作的？

通过关键词判断：

if echo "$MSG" | grep -qiE "error|fail|failed"

自动变成：

场景	标题
错误	❌ Codex 错误
修改代码	🔧 Codex 修改
完成任务	✅ Codex 完成
其他	📌 Codex 更新
4️⃣ 为什么加时间？
[$TIME]

👉 帮你判断任务是刚完成还是几分钟前

🔥 八、进阶优化（可选）
1️⃣ 不同声音提示不同状态
if echo "$MSG" | grep -qiE "error|fail"; then
  afplay /System/Library/Sounds/Basso.aiff
else
  afplay /System/Library/Sounds/Glass.aiff
fi
2️⃣ 识别“改代码”
elif echo "$MSG" | grep -qiE "file|patch|diff"; then
  TITLE="📂 Codex 改代码"
3️⃣ 极简模式（只要声音）
notify = ["afplay", "/System/Library/Sounds/Glass.aiff"]
⚠️ 常见问题
❌ 没有通知

检查：

是否安装 terminal-notifier
系统设置 → 通知 → Terminal 是否开启
脚本是否有执行权限
❌ 通知内容为空

加一行 debug：

echo "$JSON" > ~/.codex/debug.json

查看：

cat ~/.codex/debug.json
❌ jq 报错
brew install jq
🧩 总结

这套方案的特点：

✅ 简单（几十行脚本）
✅ 稳定
✅ 有声音提醒
✅ 有通知内容
✅ 自动识别任务类型
✅ 可扩展
💡 一句话结论

👉 用 10 行脚本，让 Codex 从“黑盒执行”变成“可感知的开发助手”
