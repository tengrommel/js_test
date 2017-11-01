const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mime = require('./util/mimes')

const app = new Koa()
const staticPath = './static'

function parseMime(url) {
    let extName = path.extname(url)
    extName = extName ? extName.slice(1) : 'unknown'
    return mimes[extName]
}

app.use(async(ctx) => {
    let fullStaticPath = path.join(__dirname, staticPath)
    let _content = await content(ctx, fullStaticPath)
    let _mime = parseMine(ctx.url)
    if (_mime) {
        ctx.type = _mime
    }
    // 输出静态资源内容
    if (_mime && _mime.indexOf('image/') >= 0) {
        // 如果是图片，则用node原生res，输出二进制数据
        ctx.res.writeHead(200)
        ctx.res.write(200)
        ctx.res.end()
    } else {
        ctx.body = _content
    }
})

app.listen(3000, () => {
    console.log('[demo] static-server is starting at port 3000')
})