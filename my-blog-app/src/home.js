import React from 'react';
// import './App.css';
// import '../src/style/base.less'

import { Link, Redirect } from 'react-router-dom';

import { List, Avatar, Icon, Pagination } from 'antd';

import moment from 'moment';

import 'moment/locale/zh-cn';

import Button from 'antd/lib/button';

import basePage from '../src/base/basePage'

import netWork from '../src/utills/NetUtil'

import check from '../src/utills/CheckUtil'

import timer from './utills/TimerUtil';

import cookie from '../src/utills/CookieUtil'

import keys from '../src/utills/KeyUtil'

class home extends basePage {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    handleChange(date) {

    }

    componentDidMount() {
        super.componentDidMount()
        this.setState({ ishome: true })
        netWork.get('/api/get_topic', (param) => {
            console.log(param)
        }, (error) => {
            error && alert(error)
        })
    }


    onShowSizeChange(current, pageSize) {
    }

    onStart() {

    }

    onGetContent() {
        return <List
            size="large"
            // header={}
            footer={this.state.data > 5 && <Pagination onShowSizeChange={this.onShowSizeChange.bind(this)} defaultCurrent={1} total={this.state.data} />}
            dataSource={this.state.data}
            renderItem={item => (this.onItermCell(item))}
        />
    }

    onItermCell(item) {
        let str = item.update;
        return <div>
            {timer.format(str)}
        </div>
    }


    _handleLogin() {
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) { return cookie.getCookie(keys.USER_Authorization) ? <Redirect push to="/userhome" /> : <Redirect push to="/userLogin" /> }
        return (
            <div style={{ textAlign: 'center', height: '100%', width: '100%', alignItems: 'center', flexAlign: 'center', justifyContent: 'center' }}>
                {this._navagationView()}
                {this.state.data && this.onGetContent()}
            </div>
        );
    }
}
export default home