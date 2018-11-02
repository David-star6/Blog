import React from 'react';

import { EditorState, convertToRaw, ContentState } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html'

import htmlTodraft from 'html-to-draftjs'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) => {
                    this.setState({
                        editorState
                    }, () => {
                        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                    })
                }}
            />
        );
    }
}
export default EditorConvertToHTML