const Koa = require('koa')
const app = new Koa()
const port = process.env.port || 3000

app.use(async(ctx, next) => {
    ctx.hello = 0
    await next()
})

app.use(async(ctx, next) => {
    ctx.hello += 1    
    await next()
})

app.use((ctx) => {
    ctx.body = ctx.hello
})

const server = app.listen(port)

server.on('listening', () => console.log('server is start on', port))