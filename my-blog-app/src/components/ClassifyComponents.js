import React, { Component } from 'react';

import { BaseComponents, ListView } from '../common/index'

import { Row, Col } from 'antd';

class ClassifyComponents extends BaseComponents {

    renderClass() {
        return <div>11</div>
    }

    render() {
        return (
            <div className='class'>
                <Row>
                    <Col span={2} style={{ backgroundColor: '#ffffff' }}>
                        <div>归档</div>
                        <div>2</div>
                        <div>2</div>
                        <div>2</div></Col>
                    <Col span={8} offset={1} style={{ backgroundColor: '#ffffff' }}>
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