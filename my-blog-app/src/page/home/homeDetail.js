import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { List, Avatar, Icon, Pagination } from 'antd';

import moment from 'moment';

import 'moment/locale/zh-cn';

import Button from 'antd/lib/button';

import basePage from '../../../src/base/basePage'

import netWork from '../../../src/utills/NetUtil'

import check from '../../../src/utills/CheckUtil'

import timer from '../../utills/TimerUtil';

import cookie from '../../../src/utills/CookieUtil'

import keys from '../../../src/utills/KeyUtil'

class homeDetail extends basePage {

    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        let data = window.location.search.substring(1);
        let arr = data.split('=')
        let patam = { "id": arr[1] };
        netWork.post('/api/get_topic_content/', patam, (repson) => {
            if (repson.code == 200) {
                console.log(repson)
                this._setTitle('neirong')
                this.setState({
                    content: repson.data['content']
                })
            }
        }, (error) => {
            error && alert(error)
        })
    }

    renderContent() {
        return <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
    }

    render() {
        return (
            <div>
                {this._navagationView()}
                <div className='line'></div>
                {this.renderContent()}
            </div >
        );
    }
}

export default homeDetail;