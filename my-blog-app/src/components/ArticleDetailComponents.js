import React, { Component } from 'react';

import { BaseComponents, ListView } from '../common/index'

import EditorConvertToHTML from '../view/EditorConvertToHTML'

import *  as server from '../servers/index'

class ArticleDetailComponents extends BaseComponents {

    // state={
    //     data:this.props
    // }
    state = {
        title: this.props.location.query ? this.props.location.query.name : '',
        content: this.props.location.query ? this.props.location.query.content : ''
    }

    componentDidMount() {
        let key = this.props.location.hash.slice(1)
        !this.state.title ? server.getArticleDetail({ 'id': key }).then((result) => {
            this.setState({
                title: result.data.name,
                content: result.data.content
            })
        }).catch((error) => {
        }) : ''
    }

    render() {
        const { title, content } = this.state
        return (
            <div className='article'>
                <div className='article-title'>
                    <h1 >{title}</h1>
                </div>
                <div className='article-content'>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
        );
    }
}

export default ArticleDetailComponents;