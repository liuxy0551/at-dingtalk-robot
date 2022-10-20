const dbConfig = {
  port: 3306,
  dialect: 'mysql',
  timezone: '+08:00', // 东八时区
  database : 'at-dingtalk-robot',
  host : '127.0.0.1',
  user : 'root',
  password : '123456',
  logging: false
}

module.exports = dbConfig
