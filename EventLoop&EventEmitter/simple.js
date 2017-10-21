function doHeavy(callback) {
    var total = 1e8
        cuts = 100,
        counts = 0,
        remains = cuts
    for(var i = 0; i<cuts; i++) {
        setImmediate(function () {
            counts = counts + doNotSoHeavy(total/cuts)
            remains --
            if (!remains) {
                process.nextTick(function () {
                    callback(counts)
                })
            }
        })
    }
}

doHeavy(function (params) {
    console.log(params)
})