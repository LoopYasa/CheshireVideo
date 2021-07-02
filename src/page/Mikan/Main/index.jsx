import React, { Component } from 'react';
import axios from 'axios';

import { message, BackTop, Badge  } from 'antd'
import Dialog from '../../../components/Dialog'
import Catloading from '../../Mikanloading'

import './index.scss'

export default class main extends Component {

    state = {
        isShow:false,
        loading: true,


        day1: "",
        results1: [],

        day2: "",
        results2: [],
        
        day3: "",
        results3: [],

        day4: "",
        results4: [],

        day5: "",
        results5: [],

        day6: "",
        results6: [],

        day7: "",
        results7: [],

        day8: "",
        results8: [],

        day9: "",
        results9: []
    }

    componentDidMount() {
        const _this = this
        // 为当前组件绑定界面滚轮事件
        // window.addEventListener('scroll',this.handleScroll, true)
        axios.get("http://localhost:3001/api/main")
        .then( function (response) {
            _this.setState({
                day1: response.data[0].data.day,
                results1: response.data[0].data.results,

                day2: response.data[1].data.day,
                results2: response.data[1].data.results,

                day3: response.data[2].data.day,
                results3: response.data[2].data.results,

                day4: response.data[3].data.day,
                results4: response.data[3].data.results,

                day5: response.data[4].data.day,
                results5: response.data[4].data.results,

                day6: response.data[5].data.day,
                results6: response.data[5].data.results,

                day7: response.data[6].data.day,
                results7: response.data[6].data.results,

                day8: response.data[7].data.day,
                results8: response.data[7].data.results,

                day9: response.data[8].data.day,
                results9: response.data[8].data.results
            })
            _this.setState({
                loading: false
            })
        })
        .catch( function (err) {
            console.log(err)
        })
    }

    // 组件将要卸载的时候移除滚轮绑定
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll)
    // }

    // 绑定滚动事件调用函数
    // handleScroll = (event) => {
    //     let _this = this
    //     let scollTop = event.target.scrollTop
    //     if(scollTop <= 200) {
    //         _this.setState({
    //             isShow: false
    //         })
    //     }else {
    //         _this.setState({
    //             isShow: true
    //         })
    //     }
    // }

    setHeight = () => {
        this.setState({
            open: true
        })
    }

    render() {
        const { isShow,loading,day1, results1, day2, results2, day3, results3, day4, results4, day5, results5, day6, results6, day7, results7, day8, results8, day9, results9  } = this.state

        return (
            <div className="main-card-container" id="main-card-container">

            　　<BackTop visibilityHeight={300} target ={()=>document.getElementById('main-card-container')} >
            　　　　<div className="backtopbtn" ></div>
            　　</BackTop>

                <div style={loading ? {display:"block"}:{display:"none"}}>
                    <Catloading></Catloading>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day1 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results1.map((info) => {
                                return(
                                    
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText} >
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                                {
                                                    console.log(info.id)
                                                }
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div>
                                    
                                )
                            })
                        }

                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day2 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results2.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText}>
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day3 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results3.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText}>
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day4 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results4.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText}>
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day5 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results5.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                    <Badge size="default" count={info.contentText}>
                                        <Dialog imgSrc = { info.img } name = { info.name } id = { info.id } >
                                    </Dialog>
                                    <div className="main-card-info">
                                        <span>{ info.time }</span>
                                        <span>{ info.name }</span>
                                    </div>
                                    </Badge>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day6 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results6.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText}>
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day7 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results7.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText}>
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day8 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results8.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText}>
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="week">
                    <div className="week_top">
                        <span>{ day9 }</span>
                    </div>
                    <div className="week_main">
                        {
                            results9.map((info) => {
                                return(
                                    <div className="main-card__subtext">
                                        <Badge size="default" count={info.contentText}>
                                            <Dialog imgSrc = { info.img } name = { info.name } id = { info.id }>
                                        </Dialog>
                                        <div className="main-card-info">
                                            <span>{ info.time }</span>
                                            <span>{ info.name }</span>
                                        </div>
                                        </Badge>
                                    </div> 
                                )
                            })
                        }
                    </div>
                </div>

                {/* 渲染mikan上获取到的番剧信息 */}
                {/* {
                    results.map((info) => {
                        return(
                            <div className="main-card__subtext">
                                <img src={ info.img } />
                                <div className="main-card-info">
                                    <span>{ info.time }</span>
                                    <span>{ info.name }</span>
                                </div>
                            </div>
                        )
                    })
                } */}

                </div>
        );
    }
}