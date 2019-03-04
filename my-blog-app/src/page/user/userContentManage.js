import React, { Component } from 'react';

import { Row, Col, Menu, Icon, Upload, Button, message, Modal, Divider } from 'antd';

import { Redirect } from 'react-router-dom';

import { BasePage } from '../../../src/common/index'

import netWork from '../../../src/utills/NetUtil'

import keys from '../../../src/utills/KeyUtil'

import '../../style/index.less'

import DVListView from '../../view/DVListView'

import DVUploadView from '../../view/DVUploadView'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }


    componentDidMount() {
        this.props.select(0)
    }

    handleClick = (e) => {
        this.props.select(e.key)
    }

    renderItems() {
        let arr = []
        this.state.data.map((item, index) => {
            arr.push(<Menu.Item key={index} ><Icon type={item.icon} />{item.name}</Menu.Item>)
        })
        return arr
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                defaultSelectedKeys={['0']}
                mode="inline"
            >
                {this.renderItems()}
            </Menu>
        );
    }
}

class userContentManage extends BasePage {
    currentSelect;
    constructor(props) {
        super(props)
        this.state = {
            homeListData: [],
            listData: [],
            select: '',
            loadEnd: false,
            modalVisible: false,
            modalUrl: '',
            modalHasVideo: false
        }
    }

    selectWithIndex(key) {
        if (this.state.select == String(key)) return;
        if (key == 0) { this.renderIMageWidhtNet() }
        this.setState({ select: String(key), loadEnd: false })
    }

    delectFile(object) {
        netWork.post('/api/dele_file/', { 'name': object }, (param) => {
            message.success(`删除成功.`);
            this.renderIMageWidhtNet()
        }, (error) => {
            error && alert(error)
        })
    }

    renderIMageWidhtNet(callback) {
        netWork.get('/api/getFile/', (param) => {
            this.setState({ homeListData: param.data, loadEnd: true }, () => {
                callback && callback('success')
            })
        }, (error) => {
            error && alert(error)
        })
    }

    componentDidMount() {
        netWork.get('/api/getUserCenterTitle/', (param) => {
            if (param.code == '200') {
                this.setState({
                    listData: param.data
                }, () => {
                    // this.renderIMageWidhtNet()
                })
            }
        }, (error) => {

        });
    }

    getDataListIcon(key) {
        if (!this.state.listData.hasOwnProperty(key)) return
        let objert = this.state.listData[key]
        this.currentSelect = key;
        return objert.icon
    }

    renderUploadView() {
        return <DVUploadView />
    }

    showModeFile(obj) {
        this.setState({ ModalVisible: true, modalHasVideo: obj.video.substring(obj.video.length - 3, obj.video.length) == 'MP4' ? true : false, modalUrl: keys.BASE_URL + '/' + obj.video })
    }

    renderHomes() {
        //this.renderIMageWidhtNet()
        return <div className='contain'>
            <Row>
                <Col span={24}>
                    <Divider orientation="left"><span className='lg-chara'>数据统计</span></Divider>
                    {this._emptyView()}
                </Col>
                <Col span={24}>
                    <Divider orientation="left"><span className='lg-chara'>所有文章</span></Divider>
                    {this._emptyView()}
                </Col>
                <Col span={24}>
                    <Divider orientation="left"><span className='lg-chara'>上传内容</span></Divider>
                    <DVListView listData={this.state.homeListData} listType={1} showBlock={(item) => { this.showModeFile(item) }} onclickBlock={(item) => { this._renderAler('提示', '是否确定删除', () => { this.delectFile(item.video) }) }} />
                </Col>
            </Row>
        </div>
    }

    renderItems(key) {
        if (!key) return
        if (this.currentSelect == key) return
        return key == '0' ? this.renderHomes() : key == '1' ? this.renderUploadView() : null
    }

    loadNetWork(key) {
        // if (this.getDataListIcon(key) == keys.USER_CENTER_ICON_HOME) {
        //     this.renderIMageWidhtNet()
        // } else if (this.getDataListIcon(key) == keys.USER_CENTER_ICON_UPLOAD) {
        //     this.setState({ loadEnd: true })
        // }
    }

    render() {
        return (
            <div>
                {this._navagationView()}
                <div className='line'></div>
                <Row>
                    <Col span={7}>
                        {this.state.listData.length > 0 ? <Sider key='Sider' data={this.state.listData} select={(key) => {
                            this.selectWithIndex(key);
                        }} /> : null}
                    </Col>
                    <Col span={17}>
                        {this.renderItems(this.state.select)}
                        {/* {this.state.listData.length > 0 ? !this.state.loadEnd ? this.loadNetWork(this.state.select) : this.renderItems(this.state.select) : null} */}
                        <Modal
                            wrapClassName="vertical-center-modal"
                            visible={this.state.ModalVisible}
                            onCancel={() => { this.setState({ ModalVisible: false }) }}
                            footer={null}
                        >
                            {this.state.modalHasVideo ? <video style={{ width: '100%' }} controls="controls" > <source src={this.state.modalUrl} type="video/mp4" /></video> : <img alt="example" style={{ width: '100%' }} src={this.state.modalUrl} />}
                        </Modal>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default userContentManage;