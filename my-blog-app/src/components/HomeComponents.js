import React, { Component } from 'react';

import { BaseComponents, ListView } from '../common/index'

import { List, Avatar, Icon } from 'antd';

import { Link } from 'react-router-dom';

import { StringUtil, TimerUtil } from '../utills/index';

import *  as server from '../servers/index'

class HomeComponents extends BaseComponents {

    componentDidMount() {
        server.getArticleList().then((result) => {
        }).catch((error) => {
        })
    }

    renderItem(item) {
        let str = item.update;
        return <Link to={'/app/article'}>
            <div className='home-article'>
                <div className='home-article-title'>{'item.name'}</div>
                <div className='home-article-content'>
                    {StringUtil.dealWithContent('item.content')}
                </div>
                <div className='home-article-item'>
                    {TimerUtil.currentData()}
                </div>
            </div>
        </Link>
    }

    render() {
        return (
            <ListView
                data={[1, 2, 3]}
                item={(item) => {
                    return this.renderItem(item)
                }}
            />
        );
    }
}

export default HomeComponents;