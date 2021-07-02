import React, { Component } from 'react';
// import qs from 'query-string'
import axios from 'axios';
import store from '../../redux/store';

import Html5Player from 'html5-player'
// import LMPlayer from 'lm-player'
// import { ReactFlvPlayer } from 'react-flv-player'
// import ReactPlayer from 'react-player'

import { PageHeader, Drawer } from 'antd';
import { localStorageGet, localStorageSet } from '../../StorageGS';

import 'html5-player/libs/assets/css/style.css'
import './index.scss'

export default class index extends Component {
    state = {
        nowurl: "",
        nowbv: "",
        nowcid: "",
        all: [],
        visible: false,
        isShow:""
    }

    // 接受参数
    componentDidMount(){
        const _this = this
        let cookie, season_id, Episode
        if(this.props.location.state === null) {
            cookie = store.getState()[0]
            season_id = store.getState()[3]
            Episode = store.getState()[4]
        } else {
            cookie = this.props.location.state.cookie
            season_id = this.props.location.state.season_id
            Episode = this.props.location.state.Episode
        }
        if( cookie !== "" ) {
            localStorageSet("cookie",cookie)
        }else {
            cookie = localStorageGet("cookie")
        }
        // 获取点进番剧的信息
        axios.get("http://localhost:3001/api/seasoninfo", {
            params: { season_id }
        })
        .then ( function (response) {
            _this.setState({
                all: response.data
            })
            let result = response.data
            console.log(result)
            for (var i = 0;i < result.length; i++) {
                if (Number(result[i].title) === Number(Episode)) {
                    let nowbv = result[i].bvid
                    let nowcid = result[i].cid
                    _this.setState({
                        nowbv,
                        nowcid
                    })
                    
                    // 获取点击进来的番剧播放链接
                    axios.get("http://localhost:3001/api/clickvideo", {
                        params: {
                            nowbv,
                            nowcid,
                            cookie
                        }
                    })
                    .then( function (response) {
                        _this.setState({
                            nowurl: response.data.data.durl[0].url,
                            isShow: nowbv
                        })
                    })
                    .catch( function (err) {
                        console.log(err)
                    })
                }
            }
        })
        .catch ( function (err) {
            console.log(err)
        })     
    }

    // 展示抽屉调用函数
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
    // 关闭抽屉调用函数
    onClose = () => {
        this.setState({
          visible: false,
        });
      };

    // 将当前播放视频设置为用户点击的对应集数
    setNowvideo = (bvid, cid) => {
        console.log(bvid, cid, localStorageGet("cookie"))
        const _this = this
        // 设置被用户点击集数的块背景高亮
        _this.setState({
            isShow: bvid
        })
        axios.get("http://localhost:3001/api/clickvideo", {
            params: {
                nowbv: bvid,
                nowcid: cid,
                cookie: localStorageGet("cookie")
            }
        })
        .then( function (response) {
            _this.setState({
                nowurl: response.data.data.durl[0].url
            })
        })
        .catch( function (err) {
            console.log(err)
        })
    }

    render() {
        const { nowurl, all } = this.state
        return (
            <div className="video-container">
                <div id="video-container-top">
                    <PageHeader
                        className="site-page-header"
                        onBack={() => this.props.history.go(-1)}
                        title="返回"
                        subTitle=""                    
                    />
                    <button className="showDrawer" onClick={ this.showDrawer }>集 数</button>

                    <Drawer
                    placement="right"
                    closable={false}
                    className="index"
                    maskClosable={true}
                    onClose={this.onClose}               
                    bodyStyle={{
                        backgroundColor:"#3c3a3a"
                    }}
                    visible={this.state.visible}
                    getContainer={"#video-container-top"}
                    style={{ position: 'absolute' }}
                    >
                        <div className="countAr">
                            {
                                all.map((info) => {
                                    return(
                                        <p className={ this.state.isShow === info.bvid ? 'is-show' : '' }  key={ info.bvid } onClick={ () => this.setNowvideo(info.bvid, info.cid) }>{ info.title }</p>
                                    )
                                })
                            }
                        </div>
                    </Drawer>
                </div>
                
                {/* 播放器一  卡顿 */}
                <Html5Player
                file={ nowurl }
                autoplay={ false }
                />

                {/* 播放器二  卡顿 */}
                {/* <LMPlayer 
                file={ nowurl }
                muted="false"
                autoplay={ true }
                /> */}

                {/* 播放器三  卡顿*/}
                                
                {/* <ReactFlvPlayer
                url={ nowurl }
                heigh="800px"
                width="800px"
                /> */}

                
                {/* <ReactPlayer 
                url={ nowurl }
                width="80%"
                height="80%"
                playing={true}
                controls
                /> */}



            </div>
        );
    }
}