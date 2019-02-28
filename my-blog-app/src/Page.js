import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';

class Page extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
                    <Route path='/app' component={App} />
                </Switch>
            </Router>
        );
    }
}

export default Page;