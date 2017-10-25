function getSyncTime() {
    return new Promise((resolve, reject) => {
        try {
            let startTime = new Data().getTime()
            setTimeout(() => {
                let endTime = new Date().getTime()
                let data = endTIme - startTime
                resolve(data)
            }, 5000);
        } catch (err) {
            reject(err)
        }
    })
}

async function getSyncData() {
    let time = await getSyncTime()
    let data = `endTime - startTIme = ${time}`
    return data
}

async function getData() {
    let data = await getSyncData()
    console.log(data)
}

getData()