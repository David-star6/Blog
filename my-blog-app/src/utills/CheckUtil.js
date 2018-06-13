

let checkObject = {
    replaceHtml: (html) => {
        return html.replace(/<\/?[^>]*>/g, '');
    }
}

export default checkObject;