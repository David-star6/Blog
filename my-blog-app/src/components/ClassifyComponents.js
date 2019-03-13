import React, { Component } from 'react';

import { BaseComponents, ListView, MenuView } from '../common/index'

import { Row, Col } from 'antd';

class ClassifyComponents extends BaseComponents {

    state = {
        classify: ['2019年1月10日', 2, 3, 4, 5, 6, 7, 8, 10, 30, 120, 123, 123, 213, 2, 12, 3]
    }

    renderClass(item) {
        return <a
            href={'javascript:void(0);'}
            style={{ fontSize: '16px', display: 'block', lineHeight: '40px', textAlign: 'left', paddingLeft: '40px', paddingRight: '15px' }}
            onClick={() => {
                console.log('12')
            }}
        >
            <span style={{ fontSize: '16px', marginRight: '40px' }}>2018-9-129</span>{item}
        </a>
    }

    render() {
        return (
            <div className='class'>
                <Row >
                    <Col span={6} style={{ backgroundColor: '#ffffff' }}>
                        <MenuView title={'全部分类'} data={this.state.classify} callback={(result) => {
                            console.log(result)
                        }} />
                    </Col>
                    <Col span={18} style={{ marginTop: '30px', backgroundColor: '#ffffff' }}>
                        <ListView
                            data={['个人总结', 'ios分类其它', '其它的东西不懂']}
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