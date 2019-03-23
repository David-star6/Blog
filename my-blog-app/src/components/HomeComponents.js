import React, { Component } from 'react';

import { BaseComponents, ListView } from '../common/index'

import { List, Avatar, Icon } from 'antd';

import { Link } from 'react-router-dom';

import { StringUtil, TimerUtil } from '../utills/index';

import *  as server from '../servers/index'

class HomeComponents extends BaseComponents {

    // state = {
    //     data: []
    // }

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        console.log('12121', this.props)
    }

    componentDidMount() {
        server.getArticleList().then((result) => {
            this.setState({
                data: result.data
            })
        }).catch((error) => {
        })
    }

    renderItem(item) {
        return <Link to={{
            pathname: '/app/article',
            hash: `#${item.id}`,
            query: item,
            state: '1121'
        }}>
            <div className='home-article'>
                <div className='home-article-title'>{item.name}</div>
                <div className='home-article-content'>
                    {StringUtil.dealWithContent(item.reContent)}
                </div>
                <div className='home-article-item'>
                    {TimerUtil.format(item.update)}
                </div>
            </div>
        </Link>
    }

    render() {
        return (
            <ListView
                data={this.state.data}
                item={(item) => {
                    return this.renderItem(item)
                }}
            />
        );
    }
}

export default HomeComponents;