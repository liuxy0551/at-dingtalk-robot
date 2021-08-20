const fs = require('fs')
const crypto = require('crypto')
const sequelize = require('sequelize')

// 获取 package.json 中的版本号
const getVersion = () => {
  const packageJson = fs.readFileSync(`${process.cwd()}/package.json`)
  return JSON.parse(packageJson).version
}

// 查询数据时排除被删除的行
const getWhere = (params = {}) => {
  return { isDelete: 0, ...params }
}

/**
 * page 默认为 1，pageSize 默认为 10，最大不超过 100
 * offset = (page - 1) * pageSize, limit = pageSize
 * @param {Object} query 
 */
 const getPage = (query) => {
  let { page, pageSize } = query
  page = Number(page) || 1
  pageSize = Number(pageSize) || 10
  pageSize = pageSize > 100 ? 100 : pageSize
  return { offset: (page - 1) * pageSize, limit: pageSize, page, pageSize }
}

// 艾特机器人时 sign
const getAtSign = (appSecret, time) => {
  const str = `${ time }\n${ appSecret }`
  const sign = crypto.createHmac('sha256', appSecret).update(str).digest('base64')
  return sign
}

// 获取单个 uuid
const getUuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let r = Math.random() * 16 | 0, // 随机数取整
			v = c == 'x' ? r : (r & 0x3 | 0x8)
		return v.toString(16)
	})
}

// 设置 ctx.body
const setCtxBody = (code = 200, data, message = '成功', extraParams) => {
	code !== 200 && console.log(code, data)
	return { code, data, message, ...extraParams }
}

// 获取当前时间 2021-05-20 09:18:23:112
const getNow = (time = new Date().getTime(), hasMilliSecond = true) => {
  const date = getDate(0, '-')
  let hour = new Date(time).getHours()
  let minute = new Date(time).getMinutes()
  let second = new Date(time).getSeconds()
  let milliSecond = new Date(time).getMilliseconds()
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return `${ date } ${ hour }:${ minute }:${ second }` + (hasMilliSecond ? `:${ milliSecond }` : '')
}

// 获取日期，num 为 0 时返回今天，为 -1 时返回昨天，为 1 时返回明天，如 20210520
const getDate = (num = 0, tag = '') => {
  const time = new Date().getTime() + 24 * 60 * 60 * 1000 * num
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const date = new Date(time).getDate()

  return `${ year }${ tag }${ month < 10 ? '0' + month : month }${ tag }${ date < 10 ? '0' + date : date }`
}

// 格式化时间 - https://www.cnblogs.com/iPing9/p/13539434.html
const getFormateDate = (arr = []) => {
  let list = ['createTime', 'updateTime'].concat(arr), dateList = []
  for (let i of list) {
    dateList.push([sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col(i), '%Y-%m-%d %H:%i:%s'), i])
  }
  return dateList
}

// 查询数据时包含的字段
const getInclude = (dateList = [], arr = []) => {
  return getFormateDate(dateList).concat(arr)
}

// 查询数据时排除的字段
const getExclude = (arr = []) => {
  return ['isDelete', ...arr]
}

module.exports = {
  getVersion,
  getWhere,
  getPage,
  getAtSign,
  getUuid,
  setCtxBody,
  getNow,
  getDate,
  getExclude,
  getInclude
}
