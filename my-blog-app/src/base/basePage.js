import React, { Component } from 'react';
import { Button, Col, Row, Icon } from 'antd';
import { height } from 'window-size';


export default class basePage extends Component {

    componentDidMount() {
        this.onStart()
    }

    onStart() {

    }

    navagationClick() {
        alert('ssss')
    }

    _navagationView() {
        return <div className='navbar-header'>
            <div className='navbar-meus'>
                {/* <Icon className='navbar-item' type="home" /> */}
                {/* <div className="navbar-item" style={{ marginLeft: 10 }}>登陆</div> */}
            </div>
        </div>
    }
}
