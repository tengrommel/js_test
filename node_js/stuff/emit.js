const events = require('events')
const util = require('util')

var myEmitter = new events.EventEmitter()

myEmitter.on('someEvent', function (mssg) {
  console.log(mssg)
})

myEmitter.emit('someEvent', 'the event was emitter')

var Person = function (name) {
  this.name = name
}

util.inherits(Person, events.EventEmitter)

var james = new Person('james')
var mary = new Person('mary')

people.forEach(function (person) {
  person.on('speak', function (mssg) {
    console.log(person.name + 'said :' + mssg)
  })
})

james.emit('speak', 'hey dudes')