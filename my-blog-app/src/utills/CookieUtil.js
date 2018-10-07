
let cookies = {
    setCookie: (key, value, iDay, callback) => {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = key + '=' + value + ';expires=' + oDate;
        callback && callback('')
    },
    removeCookie: (key) => {
        return this.setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
    },
    getCookie: (key) => {
        var cookieArr = document.cookie.split('; ');
        for (var i = 0; i < cookieArr.length; i++) {
            var arr = cookieArr[i].split('=');
            if (arr[0] === key) {
                return arr[1];
            }
        }
        return false;
    }
}

export default cookies;