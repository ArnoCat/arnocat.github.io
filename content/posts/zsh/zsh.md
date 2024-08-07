---
author: "arno"
date: 2024-07-25
linktitle: zsh
type:
- post
- posts/zsh
title: zsh
weight: 1
series:
- Hugo 101
---

## 实用工具

iTerm2  zsh   ohmyzsh
参考 <https://www.poloxue.com/posts/2023-10-16-zsh-themes-and-plugins/>

1. 安装报错
[oh-my-zsh] plugin 'zsh-syntax-highlighting' not found
[oh-my-zsh] plugin 'zsh-autosuggestions' not found

2. 解决
cd 到 ~/.oh-my-zsh/plugins
然后 git clone zsh-syntax-hightlight 在那里
并确保 .zshrc 中提到的插件
我认为 .zshrc 中提到的每个插件都必须放在这个目录中：~/.oh-my-zsh/plugins

$ git clone <https://github.com/zsh-users/zsh-autosuggestions> ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions

$ git clone <https://github.com/zsh-users/zsh-syntax-highlighting.git> ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

autojump 是用来在 terminal 里跳转目录的

1. 安装
$ brew install autojump

2. 注意，安装好后，仔细看提示的内容
Add the following line to your ~/.bash_profile or ~/.zshrc file:
  [ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh

If you use the Fish shell then add the following line to your ~/.config/fish/config.fish:
  [ -f /opt/homebrew/share/autojump/autojump.fish ]; and source /opt/homebrew/share/autojump/autojump.fish
编辑配置文件[将下方的命令粘进去]
$ vi ~/.zshrc

plugins=(
  git
  zsh-autosuggestions
  autojump
)
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

3. 安装成功后，

## source 在当前bash环境下读取并执行FileName(zshrc)中的命令

source ~/.zshrc

4. j --stat 显示数据库条目及其关键权重(show database entries and their key weights)

只有使用过的目录，才可以直接跳转，或者在数据库条目中的目录，才可以直接用j+目录
add DIRECTORY 添加目录到数据库
参考: <https://blog.csdn.net/shenhonglei1234/article/details/106674554>
