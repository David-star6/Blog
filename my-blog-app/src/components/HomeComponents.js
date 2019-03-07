import React, { Component } from 'react';

import { BaseComponents, ListView } from '../common/index'

import { List, Avatar, Icon } from 'antd';

import { StringUtil, TimerUtil } from '../utills/index';

class HomeComponents extends BaseComponents {

    renderItem(item) {
        let str = item.update;
        return <a href="javascript:void(0);" onClick={() => {
            this.setState({ openDetail: true, articleId: item.id })
        }}>
            <div className='home-article'>
                <div className='home-article-title'>{'item.name'}</div>
                <div className='home-article-content'>
                    {StringUtil.dealWithContent('item.content')}
                </div>
                <div className='home-article-item'>
                    {TimerUtil.currentData()}
                </div>
                {/* <div className='right' style={{ height: 24, width: 24 }}>
                <img className='vertical' style={{ width: 12, height: 12, }} src={rightIcon} />
            </div> */}
                {/* <div className='home-article-line'></div> */}
            </div>
        </a>
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