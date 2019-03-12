import React, { Component } from 'react';

class index extends Component {

    renderItem(des) {
        return <a style={{ display: 'block', lineHeight: '40px', }}>
            {des}
        </a>
    }

    render() {
        const { title, data } = this.props || []
        const heights = document.documentElement.clientHeight - 200
        return (
            <div style={{ height: heights, overflow: 'scroll', borderWidth: '1px', borderColor: '#bbb', borderStyle: 'none solid none none  ' }}>
                <div style={{ marginTop: '30px', fontWeight: 'bold' }}><p>{title}</p></div>
                {data.map((item, index) => {
                    return this.renderItem(item)
                })}
            </div>
        );
    }
}

export default index;