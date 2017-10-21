const mongo = require('mongodb').MongoClient
const client = require('socket.io').listen(4000).sockets

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', function (err, db) {
    if (err) {
        throw err
    }
    // Connect to Socket.io
    console.log('Mongo connected...')
    client.on('connection', function(){
        let chat = db.collection('chats')
        // Create function to 
        sendStatus = function(s){
            socket.emit('status', s)
        }
        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function (err, res) {
            if (err) {
                throw err
            }
            socket.emit('output', res)
        })
        socket.on('input', function (data) {
            let name = data.name
            let message = data.message
            // Check for name and message
            if (name == '' || message == '') {
                // Send error status
                sendStatus('Please enter a name and message')
            } else {
                chat.insert({name: name, message: messsage}, function () {
                    client.emit('output', [data])
                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    })
                })
            }
        })
        socket.on('clear', function (data) {
            // Remove all chats from collection
            chat.remove({}, function(){
                socket.emit('clear')
            })
        })
    })
})