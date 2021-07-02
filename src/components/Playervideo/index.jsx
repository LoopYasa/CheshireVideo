import React, { Component } from 'react';
import qs from 'query-string'
import axios from 'axios';
import store from '../../redux/store'

// import Html5Player from 'html5-player'
// import LMPlayer from 'lm-player'
// import { ReactFlvPlayer } from 'react-flv-player'
import ReactPlayer from 'react-player'

import { PageHeader } from 'antd';
import { localStorageGet, localStorageSet } from '../../StorageGS';

import 'html5-player/libs/assets/css/style.css'
import './index.scss'

export default class index extends Component {
    state = {
        playUrl: ""
    }

    // 接收参数
    componentDidMount(){
        const _this = this
        let avid = store.getState()[2]
        let cookie = store.getState()[0]
        axios.get('http://localhost:3001/api/searchvideo', {
            params: {
                avid,
                cookie
            }
        })
        .then(function(response) {
            let cid = response.data + ""
            if(cid.indexOf(",") !== -1) {
                cid = cid.slice(0, -1)
            }
            axios.get('http://localhost:3001/api/videoplay', {
                params: {
                    avid,
                    cid
                }
            })
            .then(function(response) {
                console.log(response)
                _this.setState({
                    playUrl: response.data.data.durl[0].url
                })
            })
            .catch(function(err) {
                console.log(err)
            })
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    render() {
        let {playUrl} = this.state
        return (
            <div className="vedio-container">
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.go(-1)}
                    title="返回"
                    subTitle=""
                />

                
                {/* 播放器一  卡顿 */}
                {/* <Html5Player className="player"
                flvConfig={{enableWorker: true}}
                livingMaxBuffer={ 15 }
                file={ liveurl }
                autoplay={ true }
                /> */}

                {/* 播放器二  卡顿 */}
                {/* <LMPlayer 
                file={ liveurl }
                isLive={ true }
                muted="false"
                autoplay={ true }
                /> */}

                {/* 播放器三  卡顿*/}
                {/*                 
                <ReactFlvPlayer
                url={ liveurl }
                heigh="800px"
                width="800px"
                isLive="true"
                /> */}

                <ReactPlayer 
                url={ playUrl }
                width="80%"
                height="80%"
                playing={true}
                controls
                />



            </div>
        );
    }
}