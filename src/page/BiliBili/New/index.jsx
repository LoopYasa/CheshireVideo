import axios from 'axios';
import React, { Component } from 'react';
import { NavLink, Route, BrowserRouter as Router } from 'react-router-dom';
import store from '../../../redux/store';
import { createCookie } from '../../../redux/action'

import AnimatedRouter from 'react-animated-router'

import player from '../../../components/PlayerFanju'
import Loading from '../../Bilibililoading'
import Swiper from '../../../components/Swiper'
import { localStorageGet, localStorageSet } from '../../../StorageGS';

import './index.scss'

export default class index extends Component {

    state = {
        latest:[],
        cookie:"",
        isShow: true
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({})
        })
        // 通过路由拿到登录页面cookie
        const _this = this
        let cookie = ""
        if ( this.props.location.state !== null ) {
            if ( this.props.location.state === undefined ) {
                cookie = " "
            }else {
                if ( this.props.location.state.cookie === "") {
                    cookie = localStorageGet("cookie",cookie)
                    this.setState({
                        cookie
                    })
                }
                else {
                    localStorageSet("cookie",this.props.location.state.cookie)
                    cookie = localStorageGet("cookie")
                    this.setState({
                        cookie
                    })
                }
            }
            store.dispatch(createCookie(localStorageGet("cookie")))
        } else {
            cookie = localStorageGet("cookie")
            this.setState({
                cookie
            })
            store.dispatch(createCookie(localStorageGet("cookie")))
        }
        

        // 获取季度番信息
        axios.get("http://localhost:3001/api/season")
        .then(function (response){
            _this.setState({
                latest: response.data.result.latest
            })
            _this.setState({
                isShow: false
            })
        })
        .catch(function (err) {
            console.log(err)
        })
    }

    // 暂时性解决路由返回js不执行的方法  会造成js反复加载问题 造成卡顿现象
    // componentWillReceiveProps() {
    //     let script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = 'http://81.71.103.97/swiper/swiper.js'
    //     document.getElementById('root').appendChild(script)
    // }

    render() {
        const { latest, cookie, isShow } = this.state
        
        return (
            <div>
                {/* 多级嵌套路由渲染最新页面或者播放页面 */}

                <Router>

                    <AnimatedRouter>
                        <Route exact path="/bilibili/New" render={ () => {
                            
                            return(
                                <div style={{width:"100%",height:"100%"}}>

                                    <div className="content-wrapper">

                                    <div style={isShow ? {display:'block'}:{display:'none'}}>
                                        <Loading></Loading>
                                    </div>
                                    

                                    <div className="content-section" >
                                        <Swiper></Swiper>
                                        <div className="content-section-title" style={!isShow ? {display:'block'}:{display:'none'}}>更新与热门</div>
                                    <div className="apps-card">
                                    
                                        {
                                            latest.map((videoinfo) => {
                                                return (
                                                    <div className="app-card" key={ videoinfo.season_id }>
                                                        <div className="app-card-top">
                                                            <span className="latestVideo">
                                                                <img src={ videoinfo.square_cover } width="90px" height="123px" alt="" />
                                                            </span>
                                                            <div className="app-card__subtext">
                                                                <span>{ videoinfo.title }</span>
                                                                <span>{ videoinfo.pub_index }</span>
                                                            </div>
                                                        </div>
                                                        <div className="app-card-buttons">
                                                            <NavLink activeClassName="status-button" className="custom-btn9 btn-9" to={{ pathname: '/bilibili/New/player',state: {cookie: cookie, season_id: videoinfo.season_id, Episode: videoinfo.pub_index.slice(1,-1)} }}>进入观看</NavLink>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            )
                        }}></Route>

                        <Route path="/bilibili/New/player" component={ player }></Route>
                    </AnimatedRouter>

                </Router>

            </div>
        );
    }
}


 


                    