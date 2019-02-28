import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import '../src/style/base.less'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout, notification, Icon } from 'antd';

import Home from '../src/page/home/home'

import { HeaderCustom } from './components/index'

import DocumentTitle from 'react-document-title';

const { Content, Footer } = Layout;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: 'dvd'
    }
  }

  render() {
    const { title } = this.state;
    return (
      <DocumentTitle title={'title'}>
        <Layout style={{ flexDirection: 'column' }}>
          <HeaderCustom />
          <Content style={{ margin: '0 0px', overflow: 'initial', flex: '1 1 0' }}>
            {/* <Routes auth={auth} onRouterChange={this._setTitle} /> */}
            <Route path='/app/index' render={props => {
              return <Home />
            }}></Route>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React-Admin ©{new Date().getFullYear()} Created by dvd
          </Footer>
        </Layout>
        {/* 
          <Route path='/page1' component={Page1}></Route>
          <Route path='/page2' component={Page2}></Route>
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
