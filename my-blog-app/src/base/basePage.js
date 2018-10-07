import React, { Component } from 'react';

import { Button, Col, Row, Icon, Avatar, Modal } from 'antd';

import { height } from 'window-size';

import { Link } from 'react-router-dom';

import '../style/base.less'

import netWork from '../../src/utills/NetUtil'

import homeIcon from '../img/ic_home.svg'


export default class basePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ishome: false,
        }
    }

    componentDidMount() {
        this.onStart()
    }

    onStart() {

    }

    navagationClick() {

    }

    _renderAler(title, content, sure) {
        Modal.confirm({
            title: title,
            content: content,
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(reject, 1000);
                    sure('')
                }).catch(() => { });
            },
            onCancel() { },
        });
    }

    _handleLogin() {

    }

    _showLoginButton() {
        this.setState({ ishome: true })
    }

    _emptyView() {
        return <div className='empty'>
            暂无数据
            </div>
    }


    _navagationHome() {
        return <div className='navbar-header'>
            <div className='navbar-meus'>
                <Button ghost={false} className='navbar-list-right' onClick={this._handleLogin.bind(this)}>登 录</Button>
            </div>
            <div className='navbar-title'>
                <div className='lg-size'>DVD的网络日志</div>
                <div className='base-size'>记录自己学习的点滴，做个与智者通行的人</div>
            </div>
        </div>
    }

    _onBlur() {
        alert('ss')
    }


    /**
     * https://www.jb51.net/article/28772.htm 鼠标移入移除
     * https://www.cnblogs.com/umylover/p/3949091.html
     * **/

    _navagationView() {
        return <div className='navbar-header-operate'>
            <div className='navbar-header-operate-title-text'></div>
            <div className='navbar-header-operate-title right'>
                <a className='navbar-ic-home' href="/" target="view_window">
                    <img className='homeIcon-class' src={homeIcon} /><span style={{ marginLeft: 20 }}>首页</span>
                </a>
            </div>
            <div style={{ flex: 1 }}></div>
            <div className='navbar-header-operate-function right'>
                <div className='navbar-header-operate-function-item' style={{ backgroundColor: this.state.isBlurOnLogin ? '#bbb' : '#ffffff' }}><a href='javascript:void(0);' onClick={() => {

                }} onMouseOver={() => {
                    this.setState({
                        isBlurOnLogin: true
                    })
                }} onMouseOut={() => {
                    this.setState({
                        isBlurOnLogin: false
                    })
                }} className='item-button'>登陆</a></div>
                <div className='navbar-header-operate-function-item' style={{ backgroundColor: this.state.isBlurOnRegist ? '#bbb' : '#ffffff' }}><a className='item-button' onMouseOver={() => {
                    this.setState({
                        isBlurOnRegist: true
                    })
                }} onMouseOut={() => {
                    this.setState({
                        isBlurOnRegist: false
                    })
                }}>注册</a></div>
            </div>
        </div>

    }

    _setTitle(title) {
        document.title = title;
    }

}
