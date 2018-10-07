import React, { Component } from 'react';

import { Row, Col, Menu, Icon, Upload, Button, message } from 'antd';

import '../style/base.less'

import keys from '../../src/utills/KeyUtil'

import fetchService from '../../src/utills/NetUtil'

import cookie from '../../src/utills/CookieUtil'




const hearder = cookie.getCookie(keys.USER_Authorization);



class DVUploadView extends Component {

    componentDidMount() {
        console.log('fetchService', hearder)
    }

    render() {

        const Dragger = Upload.Dragger;

        const props = {
            name: 'file',
            multiple: true,
            action: keys.BASE_URL + '/api/uploadFile/',
            //  accept: ['audio/*', 'video/*', 'image/*'],
            headers: fetchService.getHearder(),
            onChange(info) {
                let stateDic = info.file.response;
                if (!stateDic) { return }
                if (stateDic['code'] == 200) {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (stateDic['code'] == 500) {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return <Dragger key='Dragger' {...props}>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </Dragger>
    }
}

export default DVUploadView;