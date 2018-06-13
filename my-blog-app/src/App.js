import React from 'react';
import logo from './logo.svg';
// import './App.css';
import '../src/style/base.less'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'


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
          <Route path='/page3' component={Page3}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
