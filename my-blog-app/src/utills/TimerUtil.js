
let timer = {
    format: (obj) => {
        var timestamp = new Date(parseInt(obj) * 1000)
        var timestamp = new Date()
        return timestamp.getFullYear() + '年' + (timestamp.getMonth()+1) + '月' + timestamp.getDate() + "日" + timestamp.getHours() + '时' + timestamp.getMinutes() + '分'
        // return new Date(parseInt(obj) * 1000).toLocaleString()
    }
}

export default timer
