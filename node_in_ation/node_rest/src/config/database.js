import mongoose from 'mongoose'
import constants from './constants'

console.log('========================'.repeat(3))
console.log(constants)
console.log('========================'.repeat(3))

mongoose.Promise = global.Promise

try {
  mongoose.connect(constants.MONGO_URL)
} catch (error) {
  mongoose.createConnection(constants.MONGO_URL)
}

mongoose.connection
  .once('open', ()=> console.log('MongoDB Running'))
  .on('error', e=>{
    throw e
  })