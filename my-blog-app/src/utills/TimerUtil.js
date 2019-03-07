
let format = {
    dateFormat: (timestamp) => {
        return timestamp.getFullYear() + '年' + (timestamp.getMonth() + 1) + '月' + timestamp.getDate() + "日"
    }
}


let timer = {
    completeFormat: (obj) => {
        var timestamp = new Date(parseInt(obj) * 1000)
        var timestamp = new Date()
        return format.dateFormat(timestamp)
        // return new Date(parseInt(obj) * 1000).toLocaleString()
    },
    format: (obj) => {
        var timestamp = new Date(parseInt(obj) * 1000)
        var timestamp = new Date()
        return format.dateFormat(timestamp)
    },
    currentData: () => {
        var cureentTimer = new Date()
        return format.dateFormat(cureentTimer)
    }
}

export default timer
