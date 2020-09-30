# [DEPRECATED] SSR Helper CLI

一个命令行界面的ShadowsocksR助手工具
English Document is on the way.Plz be patient~

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![NPM](https://nodei.co/npm/ssr-helper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ssr-helper/)

## 声明

1. 本工具仅用于技术研讨，使用ShadowsocksR代理访问互联网时请您自觉遵守所在地的法律法规，文明上网，在本工具辅助下使用ShadowsocksR访问国际互联网所带来的问题与开发者无关
2. 提问前请注意，本工具仅在Linux平台下测试通过，也仅Linux下的问题进行维护，如有其它平台下的需求，欢迎Fork/PR

## 特点

1. 使用命令行控制ShadowosocksR Python版本的本地客户端Daemon
2. 本地可维持了一个SSR服务器列表，并可从中选择服务器使用ShadowosocksR的Python本地客户端连接，且该列表基于分组和备注，易于管理
3. 可通过友好的CLI或SSR URI手动添加服务器
4. 在较新的Linux平台（Systemd）下支持开机自动启动服务
5. 完善的SSR订阅功能支持
6. 默认开启TCP FastOpen（Linux Kernel 3.7+）
7. 测试延迟功能

## 安装

~~推荐通过 [yarn](https://yarnpkg.com/zh-Hans/) 安装：~~

> 因上游相关 BUG，使用 yarn 安装可能出现 [`(1) does not exist` 问题](https://github.com/noahziheng/ssr-helper/issues/15)，暂时建议使用新版 npm 解决

```bash
yarn global add ssr-helper
```

也可通过传统的 npm:

```bash
npm install -g ssr-helper
```

## 依赖配置

本工具仅为 [ShadowsocksR Python](https://github.com/shadowsocksr-backup/shadowsocksr/tree/manyuser) 的一个CLI，NPM包中并未包括该脚本，您需要自行下载，并在客户端内进行配置

您可以使用如ShadowosocksRR等新的分支版本，但基于稳定考虑仍推荐manyuser版本，可在Home目录下运行以下命令安装：

```bash
git clone -b manyuser https://github.com/shadowsocksr-backup/shadowsocksr.git
```

然后将Python Client的路径配置进来（如您的Python Client安装在`/home/noah/shadowsocksr`）：

```bash
ssr config /home/noah/shadowsocksr
```

## 命令行使用

现在您已经可以使用SSR Helper了，终端下运行 `ssr` 即可看到欢迎界面
以下仅对常用命令做以介绍，详细的命令列表可运行 `ssr help` 查阅

* `ssr config [path]` : 配置Python Client的路径，**绝对路径**
* `ssr add` : 手动添加服务器，具备友好的界面
* `ssr add [uri]` : 使用SSR URI手动添加服务器到列表
* `ssr connect` : 选择服务器连接并设置为默认服务器，具备友好的界面
* `ssr ls` : 显示服务器信息，具备友好的界面
* `ssr rm` : 从列表删除服务器，具备友好的界面（注：删除后连接不会中断，需运行 `connect` 命令重新连接）
* `ssr edit` : 编辑服务器信息，具备友好的界面
* `ssr local` : 编辑SSR本地服务信息，编辑后需要重新连接生效
* `ssr start` : ShadowsocksR Python Client Daemon的 start 命令,启动连接，使用CLI配置的默认服务器
* `ssr restart` : ShadowsocksR Python Client Daemon的 restart 命令，重新启动连接，使用CLI配置的默认服务器
* `ssr stop` : ShadowsocksR Python Client Daemon的 stop 命令，停止服务，使用CLI配置的默认服务器
* `ssr status` : 可查看 ShadowsocksR Python Client Daemon的 运行状态
* `ssr startup` : 设置服务开机自启，仅在Systemd启动的Linux平台下有效
* `ssr unstartup` : 关闭服务开机自启，仅在Systemd启动的Linux平台下有效
* `ssr delay` : 测试服务器的延迟
* `ssr-subscribe add [url]` : 添加新的SSR订阅地址
* `ssr-subscribe ls` : 列出所有SSR订阅地址和他们的当前标号
* `ssr-subscribe rm [label]` : 基于 `ssr-subscribe ls` 打印的标号删除SSR订阅地址
* `ssr-subscribe update` : 从已添加的SSR订阅地址获取服务器信息

## TODO

1. 改进新增服务器的CLI界面
2. 适配Windows/Mac平台
3. English Document

## License

GPLv3
