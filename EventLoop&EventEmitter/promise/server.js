const express = require('express')
const service = require('./service')
const app = express()

/**
 * slow endpoint
 */
app.get('/test/:id', (req, res)=>{
    let id = req.params.id || 1
    console.log(`request item# ${id}`)

    service.getResult(id, (err, result)=>{
        res.writeHead(200)
        res.end(JSON.stringify(result))
    })
})

app.get('/batch/:id', (req, res)=>{
    let id = req.params.id || 1
    console.log(`request item# ${id}`)

    service.getResultBatch(id, (result)=>{
        res.writeHead(200)
        res.end(JSON.stringify(result))
    })
})

app.get('*', (req, res)=>{
    res.end('hello')
})

app.listen(3333, ()=>{
    console.log('listenning on port: ', 3333)
})