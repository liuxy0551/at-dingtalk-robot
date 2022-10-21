# at-dingtalk-robot | <a href="CHANGELOG.md" target="_black">CHANGELOG</a>

在钉钉群里 @ 企业内部机器人时接收钉钉推送的消息，验证中心

## 启动项目

```
yarn
yarn dev
```

## 部署项目

将 deploy.sh 脚本中的服务器地址修改为正确地址，然后执行：

```
sh deploy.sh
```

```
ssh root@31.23.132.123
```

```
cd /mnt/projects/node/at-dingtalk-robot
./start.sh
```


## 初始化命令

### 使用以下命令自动生成 sequelize model

```
yarn models
```


## Package 说明
* koa # 主程
* koa-router # 路由
* koa-compress # 压缩响应
* koa-logger # 日志
* nodemon # nodemon是一种工具，可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于node.js的应用程序


## @ 记录

http://at-dingtalk-robot.liuxianyu.cn/admin#/at-record/index


## 回复记录

http://at-dingtalk-robot.liuxianyu.cn/admin#/reply-record/index
