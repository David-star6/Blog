import React, { Component } from 'react';

import { BaseComponents, ListView, MenuView } from '../common/index'

import { Row, Col } from 'antd';

class ClassifyComponents extends BaseComponents {

    state = {
        classify: ['2019年1月10日', 2, 3, 4, 5, 6, 7, 8, 10, 30, 120, 123, 123, 213, 2, 12, 3]
    }

    renderClass() {
        return <div>11</div>
    }

    render() {
        return (
            <div className='class'>
                <Row>
                    <Col span={6} style={{ backgroundColor: '#ffffff' }}>
                        <MenuView title={'全部分类'} data={this.state.classify} />
                    </Col>
                    <Col span={18} style={{ backgroundColor: '#ffffff' }}>
                        <ListView
                            data={[1, 2, 3]}
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