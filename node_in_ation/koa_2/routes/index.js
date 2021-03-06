const Router = require('koa-router')
const router = new Router()

const api = require('./api')
router.use('/node/api', api.routes(), api.allowedMethods())

module.exports = router