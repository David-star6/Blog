import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

import PropTypes from 'prop-types';

const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;

class index extends Component {

    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array,
        select: PropTypes.number,
    }

    static defaultProps = {
        select: 0,
    }

    state = {
        select: this.props.select || 0
    }

    renderItem(des, index) {
        return <a className={'title'} style={{ display: 'block', lineHeight: '40px', color: index == this.state.select ? '#2A2A2A' : '#666', }} key={index} href={'javascript:void(0);'} onClick={() => {
            this.setState({
                select: index
            }, () => {
                this.props.callback && this.props.callback(index)
            })
        }} >
            {des}
        </a>
    }

    render() {
        const { title, data } = this.props
        return (
            <div style={{ height: document.body.clientHeight, overflow: 'scroll', borderWidth: '1px', borderColor: '#bbb', borderStyle: 'none solid none none  ' }}>
                <div style={{ marginTop: '30px', fontWeight: 'bold' }}><p>{title}</p></div>
                {data.map((item, index) => {
                    return this.renderItem(item, index)
                })}
            </div>
        );
    }
}

export default index;