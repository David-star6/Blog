import React, { Component } from 'react';

import { BaseComponents, ListView, MenuView } from '../common/index'

import { Row, Col, } from 'antd';

import { StringUtil, TimerUtil } from '../utills/index';

import *  as server from '../servers/index'

import { Link } from 'react-router-dom';

class ClassifyComponents extends BaseComponents {

    state = {
        classify: [],
        selectIndex: 0,
        data: []
    }

    componentDidMount() {
        server.getArticleDateList().then((result) => {
            let date = []
            result.data.map((item, index) => {
                date.push(item.date)
            })
            this.setState({ classify: date, data: result.data }, () => {
                console.log(result.data)
            })
        })
    }

    renderClass(item) {
        return <Link to={{
            pathname: '/app/article',
            hash: `#${item.id}`,
            query: item,
            state: '1121'
        }}>
            <div style={{ fontSize: '16px', display: 'block', lineHeight: '40px', textAlign: 'left', paddingLeft: '40px', paddingRight: '15px' }}>
                <span style={{ fontSize: '16px', marginRight: '40px' }}>{TimerUtil.format(item.update)}</span>{item.reContent}
            </div>
        </Link>
    }

    render() {
        const data = this.state.data.length > 0 ? this.state.data[`${this.state.selectIndex}`].data : []
        return (
            <div className='class'>
                <Row >
                    <Col span={6} style={{ backgroundColor: '#ffffff' }}>
                        <MenuView title={'全部分类'} data={this.state.classify} callback={(selectIndex) => {
                            this.setState({
                                selectIndex
                            })
                        }} />
                    </Col>
                    <Col span={18} style={{ marginTop: '30px', backgroundColor: '#ffffff' }}>
                        <ListView
                            data={data}
                            item={(item) => {
                                return this.renderClass(item)
                            }}
                        /></Col>
                </Row>
            </div>
        );
    }
}

export default ClassifyComponents;