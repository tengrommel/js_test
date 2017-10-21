const sleep = require('sleep')

/**
 * mock to get data from DB
 * @param {number} id
 * @param {function} cb
 */
const getDataMock= (id, cb)=> {
    setTimeout(()=>{
        sleep.msleep(200)
        let response = {id, data:['result1', 'result2', 'result3']}
        console.log(`DB call item# ${id}`)
        cb(null, response)
    }, 200)
}

/**
 * Service Layer
 * @param {*} id
 * @param {*} cb
 * method one
 * 
 * let queue={}
 * 
 const getResult = (id, cb)=> {
    if(queue[id]) return queue[id].push(cb)
    queue[id] = [cb]
    getDataMock(id, (err, result)=>{
        queue[id].forEach((cb) => {
            cb(err, result)
        })
        delete queue[id]
    })
}
 * 
 */

const getDataPromiseMock = (id)=>{
    return new Promise((resolve, reject)=>{
        getDataMock(id, (err, result)=>{
            resolve(result)
        })
    })
}

const getResult = (id, cb)=> {
    getDataMock(id, cb)
}

let cache = {}
const getResultBatch = (id, cb)=>{
    if(cache[id]) return cache[id].then(cb)
    cache[id] = getDataPromiseMock(id);
    cache[id].then(cb).then(()=>{
        setTimeout( ()=>{
            delete cache[id]
        }, 2000)
    })
}

module.exports={
    getResult,
    getResultBatch
}