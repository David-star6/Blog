import React, { Component } from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import { HomeComponents, ArticleDetailComponents, AboutComponents, ClassifyComponents } from '../components/index'

class index extends Component {
    render() {
        return (
            <Switch>
                <Route path='/app/index' render={props => {
                    return <HomeComponents {...this.props} />
                }}></Route>
                <Route path='/app/article' render={props => {
                    return <ArticleDetailComponents {...this.props} />
                }}></Route>
                <Route path='/app/about' render={props => {
                    return <AboutComponents {...this.props} />
                }}></Route>
                <Route path='/app/classify' render={props => {
                    return <ClassifyComponents {...this.props} />
                }}></Route>
            </Switch>
        );
    }
}

export default index;