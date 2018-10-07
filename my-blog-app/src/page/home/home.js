import React from 'react';
// import './App.css';
// import '../src/style/base.less'

import { Link, Redirect } from 'react-router-dom';

import { List, Avatar, Icon, Pagination, Row, Col } from 'antd';

import moment from 'moment';

import 'moment/locale/zh-cn';

import Button from 'antd/lib/button';

import basePage from '../../../src/base/basePage'

import netWork from '../../../src/utills/NetUtil'

import check from '../../../src/utills/CheckUtil'

import timer from '../../utills/TimerUtil';

import cookie from '../../../src/utills/CookieUtil'

import keys from '../../../src/utills/KeyUtil'

import rightIcon from '../../../src/img/ic_right.svg'

import HomdeMode from '../../mode/HomeMode'

class home extends basePage {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            openDetail: false,
            articleId: null
        }
    }

    handleChange(date) {

    }

    componentDidMount() {
        super.componentDidMount()
        netWork.get('/api/get_topic_list', (param) => {
            if (param.data.length > 0) {
                this.setState({
                    data: param.data[0].data
                })
            }
        }, (error) => {
            error && alert(error)
        })
    }


    onShowSizeChange(current, pageSize) {
    }

    onStart() {

    }

    renderContent() {
        return <Row style={{ marginTop: 10 }}>
            <Col span={1}></Col>
            <Col span={18}>
                <div>
                    <List
                        size="large"
                        // header={}
                        footer={this.state.data > 10 && <Pagination onShowSizeChange={this.onShowSizeChange.bind(this)} defaultCurrent={1} total={this.state.data} />}
                        dataSource={this.state.data}
                        renderItem={item => (this.renderItem(item))}
                    />
                </div>
            </Col>
            <Col span={5}></Col>
        </Row>
    }

    changetext() {
    }

    renderItem(item) {
        let str = item.update;
        return <a href="javascript:void(0);" onClick={() => {
            this.setState({ openDetail: true, articleId: item.id })
        }}>
            <div className='home-article' >
                <div className='home-article-title'>{item.name}</div>
                <div className='home-article-content'>
                    {HomdeMode.dealWithContent(item.content)}
                </div>
                <div className='home-article-item'>
                    {timer.format(str)}
                </div>
                {/* <div className='right' style={{ height: 24, width: 24 }}>
                <img className='vertical' style={{ width: 12, height: 12, }} src={rightIcon} />
            </div> */}
                <div className='home-article-line'></div>
            </div>
        </a>
    }


    _handleLogin() {
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) { return cookie.getCookie(keys.USER_Authorization) ? <Redirect push to="/userhome" /> : <Redirect push to="/userLogin" /> }
        if (this.state.openDetail) {
            return <Redirect push to={
                {
                    pathname: "/homedetail",
                    search: "?id=" + this.state.articleId
                }
            } />
        }
        return (
            <div style={{ textAlign: 'center', height: '100%', width: '100%', alignItems: 'center', flexAlign: 'center', justifyContent: 'center' }}>
                {this._navagationHome()}
                {this.state.data && this.renderContent()}
            </div>
        );
    }
}
export default home