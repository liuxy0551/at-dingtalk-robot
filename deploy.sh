# 第一次部署时需要上传 node_modules、pm2 日志文件，在 at-dingtalk-robot 下新建文件夹 web。后续部署不需要

#!/bin/bash

user="root"
server="31.23.132.123"
# source="app/ config/ node_modules pm2/ app.js CHANGELOG.md package.json README.md deploy.sh yarn.lock"
source="app/ config/ app.js CHANGELOG.md package.json README.md deploy.sh yarn.lock"
target="/mnt/projects/node/at-dingtalk-robot"

source2="web/dist/"
target2="/mnt/projects/node/at-dingtalk-robot/web/dist/"

startTime=$(date +%Y-%m-%d\ %H:%M:%S)
echo "Upload start, $startTime"

# 上传文件到指定服务器的指定路径
scp -C -P 22 -r $source $user@$server:$target
scp -P 22 -r $source2 $user@$server:$target2

endTime=`date +"%Y-%m-%d %H:%M:%S"`
echo "Upload over, $endTime"

# 重启服务
echo "\n================================= server restart ================================= \n"
echo "ssh $user@$server \n"
# ssh $user@$server "cd $target; yarn; pm2 restart ./pm2/config.json --env production; pm2 monit;"
# ssh $user@$server "cd $target; yarn; pm2 restart ./pm2/config.json --env production; tailf pm2/logs/pm2-out.log -200;"
ssh $user@$server "cd $target; yarn; pm2 restart ./pm2/config.json --env production;"
echo "\n================================= server started ================================= \n"
