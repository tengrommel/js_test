// generator 中间件在koa v2中需要用koa-convert封装一下才能使用
const Koa = require('koa')
const convert = require('koa-convert')
const loggerGenerator = require('./logger-generator')
const app = new Koa()

app.use(convert(loggerGenerator()))

app.use((ctx) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')