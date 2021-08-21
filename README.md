# at-dingtalk-robot | <a href="CHANGELOG.md" target="_black">CHANGELOG</a>

在钉钉群里 @ 企业内部机器人时接收钉钉推送的消息，验证中心

## 启动项目

```
yarn
yarn dev
```

## 部署项目

```
sh deploy.sh
```

## Package 说明
* koa # 主程
* koa-router # 路由
* koa-compress # 压缩响应
* koa-logger # 日志
* nodemon # nodemon是一种工具，可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于node.js的应用程序


## 初始化命令

### 1、使用以下命令自动生成 sequelize model

```
yarn models
```

### 2、服务器上更新代码并重启服务

```
cd /mnt/projects/node/at-dingtalk-robot/
./start.sh

tailf pm2/logs/pm2-out.log  -200
```

## @ 记录

http://at-dingtalk-robot.liuxianyu.cn/admin#/at-record/index


## 回复记录

http://at-dingtalk-robot.liuxianyu.cn/admin#/reply-record/index
