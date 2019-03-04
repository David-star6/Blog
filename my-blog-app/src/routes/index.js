import React, { Component } from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import { HomeComponents } from '../components/index'

class index extends Component {
    render() {
        return (
            <Switch>
                <Route path='/app/index' render={props => {
                    return <HomeComponents />
                }}></Route>
            </Switch>
        );
    }
}

export default index;