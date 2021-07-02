import React, { Component } from 'react';
import axios from "axios"
import { PubSub } from 'pubsub-js'
import { NavLink } from 'react-router-dom'

import { Drawer, message } from 'antd'

import { localStorageGet, localStorageSet } from '../../StorageGS';
import './index.scss'
import 'antd/dist/antd.min.css'

export default class index extends Component {

    state = { visible: false, placement: 'top',QRimg: '', time: 0, oauthkey: "", Nowcookie:"", isShow: false }

    showDrawer = () => {
        const _this = this
        _this.setState({
            visible: true
        })

        // 获取用户登录的二维码
        axios.get("/getma")
        .then(function (response) {
            let oauthkey = response.data.data.oauthKey
            let oauthUrl = response.data.data.url
            console.log(response.data.data.url)
            _this.setState({
                QRimg: `https://tool.oschina.net/action/qrcode/generate?data=${oauthUrl}&output=image/gif&error=L&type=0&margin=0&size=4&1620150184215=`,
                oauthkey
            })
        })
        .catch(function (err) {
            console.log(err)
        })

        // 计时器判断二维码是否过期
        this.timer = setInterval( () => {
            this.setState({
                time: this.state.time + 1
            })
            if (this.state.time === 180) {
                this.setState({
                    time: 180
                })
                clearInterval(this.timer)
            }

            // 获取登录成功后的cookie将其拼接成用户cookie
            axios.post('/getinfo?oauthKey=' + this.state.oauthkey)
            .then(function (response) {
                let status = response.data.status
                let scan = response.data.data
                if (-5 === Number.parseInt(scan)) {
                    _this.setState({
                        isShow: true
                    })
                }
                console.log(response)
                if (status === true) {
                    let origin = response.data.data.url
                    let origin2 = origin.slice(42)
                    let arr1 = origin2.split("&")
                    let Nowcookie = arr1.join(";")
                    let Nowmid = arr1[0].slice(11)
                    _this.setState({
                        time: 0,
                        Nowcookie,
                        Nowmid
                    })
                    console.log(Nowcookie)
                    _this.getUserinfo(Nowcookie,Nowmid, _this)
                    _this.Saveinfo(Nowcookie,Nowmid)
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }, 1000 )
    }

    // 将数据存入本地
    // localStorageSet = (name, data) => {
    //     const userinfo = {
    //         data,
    //         expire: new Date().getTime() + 1000 * 60 * 60 * 48
    //     }
    //     localStorage.setItem(name, JSON.stringify(userinfo))
    // }

    // 从本地取出数据
    // localStorageGet = name => {
    //     const storage = localStorage.getItem(name);
    //     const time = new Date().getTime();
    //     let result = null;
    //     if (storage) {
    //         const obj = JSON.parse(storage);
    //         if (time < obj.expire) {
    //             result = obj.data;
    //         } else {
    //             localStorage.removeItem(name);
    //         }
    //     }
    //     return result;
    // };

    // 获取登录用户信息存储本地  将信息渲染到页面
    getUserinfo = (cookie,mid,_this) => {
        axios.get("http://localhost:3001/api/userinfo",{params:{cookie, mid}})
        .then(function (response) {
            console.log(response)
            let face = response.data.data.face
            let name = response.data.data.name
            localStorageSet("face", face)
            localStorageSet("name", name)
            _this.setState({})
            
        })
        .catch(function (err) {
            console.log(err)
        })
        message.success("登陆成功喵ヾ(◍°∇°◍)ﾉﾞ")
        clearInterval(this.timer)
        this.setState({
            visible: false,
            time: 0
        })
        
    }

    onClose = () => {
        this.setState({
            visible: false,
            time: 0
        })
        clearInterval(this.timer)
    }

    Saveinfo = (cookie,mid) => {
        PubSub.publish('mytopc', {cookie, mid})
    }
    
    setBackground = (index) => {
        let app = document.getElementById("app")
        switch (index) {
            case 1:
                app.style.backgroundImage = "linear-gradient(to top, #30cfd0 0%, #330867 100%)"
                break;
            case 2:
                app.style.backgroundImage = "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)"
                break;
            case 3:
                app.style.backgroundImage = "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)"
                break;
            case 4:
                app.style.backgroundImage = "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)"
                break;
            case 5:
                app.style.backgroundImage = "linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)"
                break; 
            case 6:
                app.style.backgroundImage = "linear-gradient(to top, #88d3ce 0%, #6e45e2 100%)"
                break;
            case 7:
                app.style.backgroundImage = "linear-gradient(60deg, #96deda 0%, #50c9c3 100%)"
                break;
            case 8:
                app.style.backgroundImage = "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)"
                break;
            case 9:
                app.style.backgroundImage = "linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)"
                break;
            case 10:
                app.style.backgroundImage = "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)"
                break;
            case 11:
                app.style.backgroundImage = "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)"
                break; 
            case 12:
                app.style.backgroundImage = "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)"
                break;    
            default:
                break;
        }
    }
    render() {
        const {placement, visible, QRimg, isShow } = this.state
        let userhead
        if(localStorageGet("face") !== null) {
            userhead = (
                <img className="profile-img" src={ "https://images.weserv.nl/?url=" + localStorageGet("face") } alt="" />
            )
        }else {
            userhead = (
                <img className="profile-img" src="https://ae01.alicdn.com/kf/U9776eaf2b1164f15a08cf848ba8614865.jpg" referrer="no-referrer|origin|unsafe-url" alt="" />
            )
        }
        return (
            <div>
                <div className="header">
                    <div className="menu-circle"></div>
                    <div className="header-menu">
                        <NavLink activeClassName="is-active" className="menu-link" to="/bilibili">BiliBili</NavLink>
                        <NavLink activeClassName="is-active" className="menu-link" to="/mikan">Mikan</NavLink>
                        <NavLink activeClassName="is-active" className="menu-link" to="/souman">Souman</NavLink>
                        <NavLink activeClassName="is-active" className="menu-link" to="/hpoi">Hpoi</NavLink>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className="header-profile">
                        <div className="skin">
                            <svg t="1624005468760" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2931" width="32" height="32">
                                <path d="M772.8 96v64L936 321.6l-91.2 91.2c-12.8-11.2-27.2-16-43.2-16-36.8 0-65.6 28.8-65.6 65.6V800c0 35.2-28.8 64-64 64H352c-35.2 0-64-28.8-64-64V462.4c0-36.8-28.8-65.6-65.6-65.6-16 0-32 6.4-43.2 16L88 321.6 249.6 160h40l1.6 1.6C336 228.8 420.8 272 512 272c91.2 0 176-41.6 220.8-110.4 0-1.6 1.6-1.6 1.6-1.6h38.4V96m-481.6 0H256c-22.4 0-38.4 6.4-49.6 19.2L43.2 276.8c-25.6 25.6-25.6 65.6 0 89.6l94.4 94.4c11.2 11.2 27.2 17.6 41.6 17.6s30.4-6.4 41.6-17.6h1.6c1.6 0 1.6 0 1.6 1.6V800c0 70.4 57.6 128 128 128h320c70.4 0 128-57.6 128-128V462.4c0-1.6 0-1.6 1.6-1.6h1.6c11.2 11.2 27.2 17.6 41.6 17.6 16 0 30.4-6.4 41.6-17.6l94.4-94.4c25.6-25.6 25.6-65.6 0-89.6L819.2 115.2C806.4 102.4 790.4 96 772.8 96h-40c-22.4 0-41.6 11.2-54.4 30.4-33.6 49.6-96 81.6-168 81.6s-134.4-33.6-168-81.6C332.8 107.2 312 96 291.2 96z" p-id="2932" fill="#ffffff"></path>
                            </svg>
                            <div className="skins">
                                <div className="color-1" onClick={ () => this.setBackground(1) }></div>
                                <div className="color-2" onClick={ () => this.setBackground(2) }></div>
                                <div className="color-3" onClick={ () => this.setBackground(3) }></div>
                                <div className="color-4" onClick={ () => this.setBackground(4) }></div>
                                <div className="color-5" onClick={ () => this.setBackground(5) }></div>
                                <div className="color-6" onClick={ () => this.setBackground(6) }></div>
                                <div className="color-7" onClick={ () => this.setBackground(7) }></div>
                                <div className="color-8" onClick={ () => this.setBackground(8) }></div>
                                <div className="color-9" onClick={ () => this.setBackground(9) }></div>
                                <div className="color-10" onClick={ () => this.setBackground(10) }></div>
                                <div className="color-11" onClick={ () => this.setBackground(11) }></div>
                                <div className="color-12" onClick={ () => this.setBackground(12) }></div>
                            </div>
                        </div>
                    {/* 抽屉弹出的登录界面 */}
                    <Drawer
                    title="扫描二维码登录喵φ(>ω<*) "
                    placement={placement}
                    closable={true}
                    onClose={this.onClose}
                    visible={visible}
                    key={placement}
                    >
                        <div className="Drawer-body" style={{ width: "250px",height: "200px", marginTop:"40px",  backgroundColor:"#222f3e",display:"flex",alignItems:"center",justifyContent:"center", borderRadius:"5px 5px 5px 5px" }}>
                            <div className="neko"></div>
                            <img src={ QRimg } alt="" />
                            <div className="mask-container" style={ isShow ? {display:'block'} : {display:'none'} }></div>
                            <div className="login-mask">
                                <img style={ isShow ? {display:'block'} : {display:'none'} } src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEzREU3Qzg4RDI0NDExRTY4RjM3QjJCQzlEOTlFQjY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEzREU3Qzg5RDI0NDExRTY4RjM3QjJCQzlEOTlFQjY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTNERTdDODZEMjQ0MTFFNjhGMzdCMkJDOUQ5OUVCNjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTNERTdDODdEMjQ0MTFFNjhGMzdCMkJDOUQ5OUVCNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kG2riAAAKMElEQVR42uRc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" alt="" />
                            </div>
                        </div>
                        <div style={{ position: "absolute", width: "400px", height: "30px",marginLeft: "-30px",marginTop: "20px", fontFamily: "FZShuTi", fontSize: "18px" }}>二维码有效时间为180秒,还有
                        <span style={{ width:"10px", height: "30px", color:"red" }}>{ 180 - this.state.time }</span>
                            秒哦(～￣▽￣)～ 
                        </div>
                    </Drawer>
                    
                    <div className="img-div" onClick={ this.showDrawer }>
                        { userhead }
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
