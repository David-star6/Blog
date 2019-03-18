import 'whatwg-fetch'

export default function request(method, url, body) {
    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }
    return new Promise((reslove, reject) => {
        fetch(url, {
            method,
            dataType: 'jsonp',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body
        }).then((response) => {
            reslove(response.json());
        }).then((response) => {
        }).catch((ex) => {
            reject('请求失败！');
        });
        console.log(url)
    })
}

export const get = path => request('GET', path);

export const post = (path, body) => request('POST', path, body);