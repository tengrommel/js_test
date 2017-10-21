const Router = require('koa-router')
const router = new Router()

router.post('/login', (ctx) => {
    ctx.body = {
        token: '123456'
    }
})

module.exports = router