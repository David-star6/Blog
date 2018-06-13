import React from 'react';
// import './App.css';
// import '../src/style/base.less'

import { Link } from 'react-router-dom';

import { List, Avatar, Icon, Pagination } from 'antd';

import moment from 'moment';

import 'moment/locale/zh-cn';

import Button from 'antd/lib/button';

import basePage from '../src/base/basePage'

import netWork from '../src/utills/NetUtil'

import check from '../src/utills/CheckUtil'

import timer from './utills/TimerUtil';

class home extends basePage {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    handleChange(date) {

    }

    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }

    onStart() {
        netWork.get('http://127.0.0.1:8000/get_list/',(param)=>{
            this.setState({data:param.data})
        },(error)=>{
            error && alert(error)
        })
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

    render() {
        return (
            <div style={{ textAlign: 'center', height: '100%', width: '100%', alignItems: 'center', flexAlign: 'center', justifyContent: 'center' }}>
                {this._navagationView()}
                {this.state.data && this.onGetContent()}
            </div>
        );
    }
}
export default home