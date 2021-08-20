# git clone https://github.com/liuxy0551/at-dingtalk-robot.git
git checkout .
git pull origin master
yarn
pm2 restart ./pm2/config.json --env production
# pm2 monit
tailf pm2/logs/pm2-out.log  -200
