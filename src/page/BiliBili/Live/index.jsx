import axios from 'axios';
import React, { Component } from 'react';
import { NavLink, Route, BrowserRouter as Router} from 'react-router-dom';

import AnimatedRouter from 'react-animated-router'

import { localStorageGet,localStorageSet } from '../../../StorageGS';
import player from '../../../components/Player'
import Loading from '../../Bilibililoading'
import Swiper from '../../../components/Swiper/index'

import './index.scss';

export default class index extends Component {
    
    state = {
        liveItems: [],
        isShow: true
    }

    componentDidMount(){
        // 通过路由拿到登录页面cookie访问关注主播信息
        const _this = this
        let cookie
        if ( this.props.location.state !== null ) {
            if ( this.props.location.state.cookie === "") {
                cookie = localStorageGet("cookie",cookie)
            }
            else {
                localStorageSet("cookie",this.props.location.state.cookie)
                cookie = localStorageGet("cookie")
            }
        } else {
            cookie = localStorageGet("cookie")
        }
        axios.get("http://localhost:3001/api/list", { params: { cookie } })
        .then(function (response) {
            _this.setState({
                liveItems: response.data.items,
                isShow: false
            })
        })
        .catch(function (err) {
            console.log(err)
        })
    }
    
    render() {
        const {liveItems, isShow} = this.state
        let liveShow
        // 渲染关注主播的房间
        if ( liveItems !== [] ) {
            liveShow = (
                (liveItems || []).map((liver) => {
                    return (
                        <div className="live-app-card" key={ liver.uid }>
                            <div className="live-app-card-top">
                                <span>
                                    <img src={ `https://images.weserv.nl/?url=${liver.face}` } width="90px" height="95px" alt="" />
                                </span>
                                <div className="live-app-card__subtext">
                                    <span>{ liver.title }</span>
                                    <span>{ liver.uname }</span>
                                </div>
                            </div>
                            <div className="live-app-card-buttons">
                            <NavLink className="custom-btn9 btn-9" to={ `/bilibili/Live/player/?id=${ liver.link.slice(26) }` }>进入</NavLink>
                            </div>
                        </div>
                    )
                })
            )
        } else {
            liveShow = (<div></div>)
        }

        return (
            <div>
                {/* 多级嵌套路由渲染在原页面中跳转二级路由 */}
                <Router>
                    <AnimatedRouter>
                        <Route exact path="/bilibili/Live" render={() => {
                            return(
                                <div className="content-wrapper">

                                <div style={isShow ? {display:'block'}:{display:'none'}}>
                                    <Loading></Loading>
                                </div>

                                <div className="content-wrapper-header"  style={{ backgroundImage:"url(https://ae01.alicdn.com/kf/U1f18ea1afa764e1e83b8222106d3bdffL.jpg)" }} >
                                    <div className="content-wrapper-context">
                                    <h3 className="img-content">
                                    <svg t="1620054450568" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2652" width="64" height="64"><path d="M944.835302 353.586994l-10.800419-2.486857 2.493038-10.773634c16.074946-69.444507-42.954431-133.255984-112.324764-123.724748-56.315879 7.73872-98.122688 38.501988-135.84998 80.263468H335.648018V762.684266H512.000598c16.064644 69.811252 78.722318 142.008402 120.60948 180.96573 100.970109 93.915429 204.639292 25.921416 201.645586-59.540346l-0.387348-11.047662 11.076507-0.385288c109.901779-3.828153 167.64961-171.560177-49.226173-262.896032 58.096032-5.060249 116.241513-22.618656 154.584853-46.518857 23.337722-14.542036 42.389891-33.33666 56.783581-54.743823 38.96763-57.955928 7.446149-138.882833-62.251782-154.930994z" fill="#FFB5C0" p-id="2653"></path><path d="M685.213185 91.035042C654.371624 28.395911 560.783793 15.164266 512.000598 67.338817c-48.783195-52.174551-142.371026-38.942905-173.212588 23.696225-28.177513 57.23068-22.142712 144.404604-3.139992 205.832242-37.727292-41.761481-79.536161-72.524748-135.84998-80.263469-69.370334-9.531235-128.39971 54.278181-112.324764 123.724748l2.493038 10.773634-10.800419 2.486857c-69.697932 16.048161-101.219412 96.975066-62.253843 154.933055 14.39369 21.407163 33.445859 40.201787 56.783582 54.743823 38.34334 23.898141 96.490881 41.456547 154.584853 46.518857-216.873722 91.331734-159.125891 259.063759-49.226173 262.891911l11.076507 0.385288-0.387348 11.047662c-2.991646 85.461763 100.675477 153.455775 201.645585 59.540346 41.887163-38.957328 104.544837-111.154479 120.609481-180.96573a430.852636 430.852636 0 0 1-10.363622-58.300008l137.43852-367.968322a440.163412 440.163412 0 0 1 49.277682-39.548652c19.004781-61.427638 25.039581-148.601561-3.137932-205.832242z" fill="#FF8E9E" p-id="2654"></path><path d="M327.043946 468.639678l-137.04087-78.227831a15.452716 15.452716 0 0 0-15.320853 26.838278l137.040869 78.227831z" fill="#EA5B70" p-id="2655"></path><path d="M855.077684 396.170559a15.450656 15.450656 0 0 0-21.079565-5.758712l-137.04087 78.227831 15.320854 26.840338 137.040869-78.227831a15.452716 15.452716 0 0 0 5.758712-21.081626z" fill="#FF8E9E" p-id="2656"></path><path d="M274.210078 779.212491a15.452716 15.452716 0 0 0 22.2993 21.396861l117.115107-122.062036-22.30136-21.396861z" fill="#EA5B70" p-id="2657"></path><path d="M632.667769 657.142213l-22.301361 21.396861 117.123348 122.068218a15.452716 15.452716 0 0 0 22.2993-21.396861z" fill="#FF8E9E" p-id="2658"></path><path d="M512.000598 160.364169a15.452716 15.452716 0 0 0-15.452717 15.452716V308.024145h30.905433V175.816885a15.452716 15.452716 0 0 0-15.452716-15.452716z" fill="#EA5B70" p-id="2659"></path><path d="M639.075495 336.417996H501.636976v367.968322c3.434624 0.17101 6.887791 0.259606 10.363622 0.259606 113.789682 0 206.036217-92.244475 206.036217-206.036218 0-65.845054-30.886889-124.47472-78.96132-162.19171z" fill="#FFDBE0" p-id="2660"></path><path d="M512.000598 292.571429c-113.789682 0-206.036217 92.244475-206.036218 206.036217 0 110.313851 86.69592 200.378463 195.672596 205.776612 0-137.415855 34.478101-272.423147 137.438519-367.968322C604.067881 308.951308 559.947286 292.571429 512.000598 292.571429z" fill="#FFB5C0" p-id="2661"></path><path d="M382.069006 572.924881a41.207243 32.815388 0.11 1 0 0.126002-65.630656 41.207243 32.815388 0.11 1 0-0.126002 65.630656Z" fill="#FF8E9E" p-id="2662"></path><path d="M641.875527 507.951388c-22.758761-0.049449-41.238149 14.601787-41.279356 32.724733-0.039147 18.122946 18.37637 32.856596 41.135131 32.906044s41.240209-14.601787 41.279356-32.724732-18.37637-32.854535-41.135131-32.906045z" fill="#FF8E9E" p-id="2663"></path><path d="M399.638746 476.879066a15.452716 15.452716 0 0 0-15.452716 15.452717v24.724346a15.452716 15.452716 0 0 0 30.905433 0v-24.724346a15.452716 15.452716 0 0 0-15.452717-15.452717zM624.006006 476.879066a15.452716 15.452716 0 0 0-15.452716 15.452717v24.724346a15.452716 15.452716 0 0 0 30.905432 0v-24.724346a15.452716 15.452716 0 0 0-15.452716-15.452717zM565.767809 517.843187a15.452716 15.452716 0 0 0-15.452717 15.452716c0 6.249078-5.082913 11.331992-11.331991 11.331992s-11.331992-5.082913-11.331992-11.331992a15.452716 15.452716 0 0 0-30.905433 0c0 6.249078-5.082913 11.331992-11.331992 11.331992s-11.331992-5.082913-11.331992-11.331992a15.452716 15.452716 0 0 0-30.905433 0c0 35.565972 41.547203 55.221827 69.022133 32.629956 27.470809 22.589811 69.022133 2.940137 69.022133-32.629956a15.452716 15.452716 0 0 0-15.452716-15.452716z" fill="#313D40" p-id="2664"></path></svg>
                                    还没想好
                                    </h3>
                                    <div className="content-text">1码代码ing码代码ing码代码ing码代码ing码代码ing码代码ing码代码ing码代码ing码代码ing码代码ing</div>
                                    <button className="content-button">点我了解</button>
                                    </div>
                                    <img className="content-wrapper-img" src="https://ae01.alicdn.com/kf/U91248fd01b214646a4ad4c6a5b943a2d8.jpg" alt="" />
                                </div> 
                                <div className="live-content-section">
                                <div className="content-section-title" style={!isShow ? {display:'block'}:{display:'none'}}>订阅的直播</div>
                                <div className="apps-card">
                                    {/* 渲染直播条目 */}
                                    { liveShow }
                                </div>
                                </div>
                                </div>
                            )
                        }}></Route>

                        {/* 二级路由 */}
                        <Route path="/bilibili/Live/player" component={ player }></Route>
                    </AnimatedRouter>
                </Router>
            </div>
        );
    }
}