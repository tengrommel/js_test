var amqp = require("amqplib/callback_api")
const moment = require("moment")

amqp.connect("amqp://localhost", function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = "hello"
        ch.assertQueue(q, {durable: false})
        console.log(q)
        ch.consume(
            q,
            function (msg) {
                console.log(msg.content.toString(), moment())
            },
            {noAck: true}
        )
    })
})