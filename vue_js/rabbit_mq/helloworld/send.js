const amqp = require('amqplib/callback_api')
const moment = require('moment')

amqp.connect("amqp://localhost", function(err, conn) {
  if(err) return 
  conn.createChannel(function (err, ch) {
    const q = "hello"
    ch.prefetch(2) // 一次可以领到几个任务
    ch.assertQueue(q, {durable: false})
    sch.sendToQueue(q, new Buffer('{"hello": "world"}'))

    setTimeout(function () {
      conn.close()
      process.exit(0)
    }, 500)
    console.log(" [x] Sent 'Hello World!'")
  })
})