import React, { Component } from 'react';

import { List, Avatar, Icon } from 'antd';

import PropTypes from 'prop-types';

const listData = [];

for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class index extends Component {

    static propTypes = {
        data: PropTypes.array,
        footer: PropTypes.func,
        page: PropTypes.number,
        item: PropTypes.func
    }

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={this.props.page ? {
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: this.props.page,
                } : null}
                dataSource={this.props.data}
                footer={this.props.footer}
                renderItem={item => (
                    // <List.Item
                    //     key={item.title}
                    // // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    // // extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    // >
                    <div className='list-item'>
                        {this.props.item(item)}
                    </div>
                    // </List.Item>
                )
                }
            />
        );
    }
}

export default index;