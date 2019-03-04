import React, { Component } from 'react';

import { List, Avatar, Icon } from 'antd';

import PropTypes from 'prop-types';

import '../style/index.less'

import keys from '../../src/utills/KeyUtil'

class DVListView extends Component {
    static propTypes = {
        style: PropTypes.object,
        listData: PropTypes.array,
        listType: PropTypes.number,
        showBlock: PropTypes.any,
        onclickBlock: PropTypes.any,
    }

    static defaultProps = {
        listData: [],
        listType: 2
    }

    constructor(props) {
        super(props)
        this.state = {
            listData: this.getListdata(this.props.listData)
        }
    }

    componentWillReceiveProps(props) {
        if (this.ishasOwnProps(props)) return
        console.log('type', props.hasOwnProperty)

        this.setState({
            listData: this.getListdata(props.listData)
        })
    }

    ishasOwnProps(obj) {
        if (!obj) { return true };

    }

    getListdata(data) {
        if (this.props.listType) {
            if (data.length % 3 != 0) {
                let index = 3 - data.length % 3;
                console.log(index)
                for (let i = 0; i < index; i++) {
                    data.push([])
                }
            }
            let arrayData = []
            for (let i = 0; i < data.length / 3; i++) {
                let array = []
                array.push(data[i + i])
                array.push(data[i + i + 1])
                array.push(data[i + i + 2])
                arrayData.push(array)
            }
            return arrayData
        }
    }

    renderListCell(item) {
        let keys = 0;
        if (this.props.listType == 1) {
            item.forEach((item, index) => {
                item.id ? keys = keys + item.id : null
            })
        }
        return <List.Item
            key={keys}
        >
            {console.log(item)}
            {this.props.listType == 1 ? this.renderImageItem(item) : null}
        </List.Item>
    }

    renderImageItem(data) {
        let arr = []
        data.map((item, index) => {
            return arr.push(item && JSON.stringify(item) == '[]' ? null : <div key={item.id + index} className="right default-horizontal">
                <div className="right">
                    <a href="javascript:void(0);" onClick={() => { this.props.showBlock(item) }}>
                        <img alt="example" style={{ width: 200, height: 200 }} src={keys.BASE_URL + '/' + item['video']} />
                    </a>
                </div>
                <div className="right">
                    <a href="javascript:void(0);" onClick={() => { this.props.onclickBlock(item) }} style={{ marginLeft: -20, position: 'absolute', color: '#666' }}><Icon type="close" /></a>
                </div>
            </div>)
        })
        return arr
    }

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                key='list'
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}

                dataSource={this.state.listData}
                footer={null}
                renderItem={(item) => (
                    this.renderListCell(item)
                )
                }
            />
        );
    }
}

export default DVListView;