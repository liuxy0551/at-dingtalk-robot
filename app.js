const Koa = require('koa')
const logger = require('koa-logger')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const static = require('koa-static')
const { appPort } = require('./config/app.config')
const middles = require('./app/middleWares')
const router = require('./app/router')

const app = new Koa()

// 静态页面
app.use(static(`${ __dirname }/web/dist`))

app.use(logger())
app.use(compress({
  threshold: 1024 // 超过大小即压缩，bytes
}))

app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    maxFileSize: 100 * 1024 * 1024    // 设置上传文件大小最大限制，默认100M
  }
}))

// 启动自定义中间件
middles(app)

// 启动路由
router(app)

// app错误监听
app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(appPort, () => {
  console.log(`app runs on port ${ appPort }`)
})
