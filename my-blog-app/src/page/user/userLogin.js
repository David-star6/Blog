import React, { Component } from 'react';

import { BasePage } from '../../../src/common/index'

import netWork from '../../../src/utills/NetUtil'

import { Row, Col, Form, Icon, Input, Button, Checkbox, Divider, message } from 'antd';

import cookie from '../../utills/CookieUtil'

import keys from '../../utills/KeyUtil'

import { Redirect } from 'react-router-dom';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = { 'username': values.userName, 'password': values.password }
                netWork.post('/api/login/', param, (repson) => {
                    repson.code == 200 ? cookie.setCookie(keys.USER_Authorization, repson.data.token, '', () => {
                        this.props.logState('success')
                    }) : message.warning(repson.msg);
                }, (error) => {
                    error && alert(error)
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
            </Button>
                    Or <a href="javascript:void(0);" onClick={() => {
                        this.props.regist('')
                    }} >register now!</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class userLogin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            regis: false
        }
    }

    componentWillMount() {
        if (cookie.getCookie(keys.USER_Authorization)) {
            // this.SetloginState()
        }
    }

    setloginState() {
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.regis) { return <Redirect push to="/regist" /> }
        if (this.state.redirect) { return <Redirect push to="/userhome" /> }
        return (
            <div className='contain'>
                <div className='user-log-logname-line'></div>
                <div className='user-log-frame'>
                    <div className='user-log-frame-contant'>
                        <Row>
                            <Divider className='user-log-frame-title'><div className='user-log-frame-title'><span>登 录</span></div></Divider>
                            <Col span={24} >
                                <div className='user-log-input'>
                                    <WrappedNormalLoginForm regist={() => {
                                        this.setState({ regis: true })
                                    }} logState={() => {
                                        this.setloginState()
                                    }} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}


export default userLogin;