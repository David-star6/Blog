import React from 'react';
import logo from './logo.svg';
// import './App.css';
import '../src/style/base.less'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../src/page/home/home'

import Page1 from './page1'

import Page2 from './page2'

import userLogin from '../src/page/user/userLogin'

import regist from '../src/page/user/userRegister'

import userhome from '../src/page/user/userContentManage'

import homedetail from '../src/page/home/homeDetail'

import key from '../src/utills/KeyUtil'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home}></Route>
          <Route path='/page1' component={Page1}></Route>
          <Route path='/page2' component={Page2}></Route>
          <Route path={key.ROUTE_PATH_LOGIN} component={userLogin}></Route>
          <Route path='/userhome' component={userhome}></Route>
          <Route path='/regist' component={regist}></Route>
          <Route path='/homedetail' component={homedetail}></Route>
        </div>
      </Router>
    )
  }
}



export default App;
