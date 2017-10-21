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

module.exports={
    getResult
}