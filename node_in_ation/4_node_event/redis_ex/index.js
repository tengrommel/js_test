var redis = require('redis')
var client = redis.createClient()

client.on('error', function() {
    console.error('Error', err)
})

client.on('monitor', function(timestamp, args) {
    console.log('Time', timestamp, 'arguments:', args)
})

client.on('ready', function() {
    // Start
})