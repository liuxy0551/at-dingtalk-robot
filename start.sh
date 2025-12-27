# git clone https://github.com/liuxy0551/at-dingtalk-robot.git
git add config/
git pull origin master

# Install web dependencies
cd web
npm install
npm run build

cd ..
npm install
pm2 restart ./pm2/config.json --env production
