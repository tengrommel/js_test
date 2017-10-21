const Router = require('koa-router')
const router = new Router()

router.get('/hello', async(ctx)=>{
    ctx.body = 'world'
})

router.post('/hello2', async(ctx)=>{
    ctx.body = "I am hello2"
})

module.exports = router