var util = require('util')
var events = require('events')

// 事件执行设备
var AudioDevice = {
    play: function(track, state) {
        // Stub: Trigger playback through iTunes, mpg123, etc.
        console.log(`I am playing! ${track}, ${state}`)
    },
    stop: function(state) {
        console.log(`The AudioDevice is stop! ${state}`)
    }
}

function MusicPlayer() {
    this.playing = false;
    events.EventEmitter.call(this)
}

util.inherits(MusicPlayer, events.EventEmitter)

// 实例化一个音乐播放器
var musicPlayer = new MusicPlayer()

// 创建事件监听器 'play'
musicPlayer.on('play', function(track) {
    this.playing = true
    AudioDevice.play(track, this.playing)
})

// 创建事件监听器'stop'
musicPlayer.on('stop', function() {
    this.playing = false
    AudioDevice.stop(this.playing)
})

musicPlayer.emit('play', 'The Roots - The Fire')

setTimeout(function() {
    musicPlayer.emit('stop')
}, 1000);