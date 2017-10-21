const Koa = require('koa')
const app = new Koa()
const port = process.env.port || 3000

app.use(async(ctx, next) => {
    ctx.hello = 0
    console.log(1)
    await next()
    console.log(11)
})

app.use(async(ctx, next) => {
    console.log(2)
    ctx.hello += 10
    await next()
    console.log(22)
})

app.use((ctx) => {
    ctx.body = ctx.hello
})

const server = app.listen(port)

server.on('listening', () => console.log('server is start on', port))