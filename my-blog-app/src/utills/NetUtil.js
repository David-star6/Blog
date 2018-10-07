import 'whatwg-fetch'

import cookie from '../../src/utills/CookieUtil'

import keys from '../../src/utills/KeyUtil'

const qs = require('qs');


let fetchService = {
    getHearder: () => {
        if (!cookie.getCookie(keys.USER_Authorization)) return {};
        let value = 'Token ' + cookie.getCookie(keys.USER_Authorization)
        return { 'Authorization': value };
    },
    fetch: (url, method, header, body) => {
        // console.log(header)
        // if (!header) {
        //     // headers: {'Authorization': 'Token cecea029b95f9234cd5f18053ae3bd13cc5f72bc' }
        //     console.log(cookie.getCookie(keys.USER_Authorization))
        //     cookie.getCookie(keys.USER_Authorization) ? header = { 'Authorization': 'Token cecea029b95f9234cd5f18053ae3bd13cc5f72bc' } : header = {}
        // }
        // let notAuthorizedCounter = 0
        // return fetchService[method.toLowerCase()](url, header, body).catch(function (exception) {
        //     console.log('fetchService failed:', exception);
        //     // token过期，重新获取token并发起请求
        //     if (exception.code === '401' || exception.code === '403') {
        //         notAuthorizedCounter++;
        //         // 最多重试3次
        //         if (notAuthorizedCounter > 2) {
        //             // notAuthorizedCounter = 0;
        //             console.warn("401 or 403 received. Max attemps reached.");
        //             return;
        //         } else {
        // return fetchService.fetch(url, method, header, body);
        //         }
        //     }
        // });
    },
    get: (url, respon, error) => {
        // return fetch(keys.BASE_URL + url, {
        //     method: 'GET',
        //     headers: getHearder(),
        // }).then((response) => {
        //     return response.json();
        // }).then((response) => {
        //     respon(response)
        // }).catch((ex) => {
        //     error(ex)
        // });
        fetchService.gets(url, '', (res) => {
            respon(res)
        }, (err) => {
            error(err)
        })
    },
    gets: (url, param, respon, error) => {
        return fetch(keys.BASE_URL + url, {
            method: 'GET',
            dataType: 'jsonp',
            headers: fetchService.getHearder(),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            respon(response)
        }).catch((ex) => {
            error(ex)
        });

    },
    post: (url, param, success, error) => {
        let header = {}
        header = { ...fetchService.getHearder(), 'Content-Type': 'application/x-www-form-urlencoded' }
        return fetch(keys.BASE_URL + url, {
            method: 'POST',
            headers: header,
            dataType: 'jsonp',
            body: qs.stringify(param)
        }).then((response) => {
            return response.json()
        }).then((json) => {
            success(json)
        }).catch((error) => {
            // error(error)
        })
    }
};
export default fetchService;