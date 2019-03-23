import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import '../src/style/base.less'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout, notification, Icon } from 'antd';

import Home from '../src/page/home/home'

import Routes from './routes/index'

import { HeaderCustom } from './components/index'

import { BasePage } from './common/index'

import DocumentTitle from 'react-document-title';

const { Content, Footer } = Layout;

class App extends BasePage {

  constructor(props) {
    super(props)
    this.state = {
      title: 'dvd'
    }
    // console.log(this.props)
  }

  render() {
    const { title } = this.state;
    return (
      <DocumentTitle title={title}>
        <Layout style={{ flexDirection: 'column', backgroundColor: this._MAIN_COLOR }}>
          <HeaderCustom />
          <Content style={{ margin: '0 0px', overflow: 'initial', flex: '1 1 0', backgroundColor: this._MAIN_COLOR }}>
            {/* <Routes auth={auth} onRouterChange={this._setTitle} /> */}
            {/* <Route path='/app/index' render={props => {
              return <Home />
            }}></Route> */}
            <Routes {...this.props} />
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: this._MAIN_COLOR }}>
            React-Admin ©{new Date().getFullYear()} Created by dvd
          </Footer>
        </Layout>
        {/* 
          <Route path={key.ROUTE_PATH_LOGIN} component={userLogin}></Route>
          <Route path='/userhome' component={userhome}></Route>
          <Route path='/regist' component={regist}></Route>
          <Route path='/homedetail' component={homedetail}></Route> 
          */}
      </DocumentTitle>
    )
  }
}



export default App;
