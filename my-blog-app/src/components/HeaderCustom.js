import React, { Component } from 'react';

import { Menu, Icon, Layout, Badge, Popover } from 'antd';

import heardImg from '../style/img/ic_heard_img.png'

import { Link } from 'react-router-dom';

const { Header } = Layout;

class HeaderCustom extends Component {
    render() {
        return (
            <Header className='navbar-header'>
                <div className='img-header'>
                    <img src={heardImg} alt='背景' height='160' width='100%' />
                </div>
                <div className='navbar-meus'>
                    <Link to={"/"} className='navbar-meus-item'>首页</Link>
                    <Link to={"/app/classify"} className='navbar-meus-item'>归档</Link>
                    <div className='navbar-meus-flex'></div>
                    <Link to={"/app/about"} className='navbar-meus-log'>关于</Link>
                    {/* <a href={key.ROUTE_PATH_LOGIN} className='navbar-meus-log'>登陆</a> */}
                    {/* <Button ghost={false} className='navbar-list-right' onClick={this._handleLogin.bind(this)}>登 录</Button> */}
                </div>
                <div className='navbar-title'>
                    <div className='title-fontSize lg-size'>DVD的网络日志</div>
                    <div className='base-size'>记录自己学习的点滴，做个与智者通行的人</div>
                </div>
            </Header>
        );
    }
}

export default HeaderCustom;