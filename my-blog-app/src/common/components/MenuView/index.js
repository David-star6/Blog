import React, { Component } from 'react';

import PropTypes from 'prop-types';

class index extends Component {

    static defaultProps = {
        title: PropTypes.string,
        data: PropTypes.array,
    }

    renderItem(des, index) {
        return <a key={index} href={'javascript:void(0);'} style={{ display: 'block', lineHeight: '40px', }} onClick={() => {
            this.props.callback && this.props.callback(index)
        }} >
            {des}
        </a>
    }

    render() {
        const { title, data } = this.props
        const heights = document.documentElement.clientHeight - 200
        return (
            <div style={{ height: heights, overflow: 'scroll', borderWidth: '1px', borderColor: '#bbb', borderStyle: 'none solid none none  ' }}>
                <div style={{ marginTop: '30px', fontWeight: 'bold' }}><p>{title}</p></div>
                {data.map((item, index) => {
                    return this.renderItem(item, index)
                })}
            </div>
        );
    }
}

export default index;