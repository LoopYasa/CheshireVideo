import axios from 'axios'
import React, { Component } from 'react'
import { NavLink, Route, Redirect } from 'react-router-dom'
import store from '../../../../../../redux/store'
import { createIdAction, createEp, createSeasonid } from '../../../../../../redux/action'

import { Pagination } from 'antd'

import { localStorageGet, localStorageSet } from '../../../../../../StorageGS';
import './index.scss'

export default class index extends React.Component {
    state = {
        keyword: '',
        page: 1,
        web_game: [],
        card: [],
        media_bangumi: [],
        media_ft: [],
        bili_user: [],
        user: [],
        star: [],
        video: [],
        numberPages: 0,
        pageNumber: 1
    }

    componentDidMount() { 
        store.subscribe(() => {
            this.setState({})
        })
        let keyword = store.getState()[1]
        if(keyword !== ""){
            localStorageSet("keyword", keyword)
        }else {
            keyword = localStorageGet("keyword")
        }
        this.setState({
            keyword
        })
        let pageNumber = this.state.pageNumber
        // let keyword = ""
        // if(this.props.location.search.indexOf("%") == -1) {
        //     keyword = this.props.location.search.slice(9).split("&")[0]
        //     localStorageSet("keyword", keyword)
        // } else {
        //     keyword = localStorageGet("keyword")
        // }
        // let pageNumber = this.state.pageNumber
        // this.setState({
        //     keyword
        // })
        this.setPageinfo(keyword, pageNumber)
    }

    setPageinfo = (keyword, page) => {
        const _this = this
        axios.get('http://localhost:3001/api/searchresults', { params: {
            keyword,
            page
        } })
        .then(function(response) {
            _this.setState({
                web_game: response.data.data.result[1].data,
                card: response.data.data.result[2].data,
                media_bangumi: response.data.data.result[3].data,
                media_ft: response.data.data.result[4].data,
                bili_user: response.data.data.result[5].data,
                user: response.data.data.result[6].data,
                star: response.data.data.result[7].data,
                video: response.data.data.result[8].data,
                numberPages: response.data.data.numPages
            })
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    // ?????????????????????????????????????????????
    gettime = (ns) => {
        var date=new Date(parseInt(ns)* 1000)
        var year=date.getFullYear()
        var mon = date.getMonth()+1
        var day = date.getDate()
        return year + '-' + mon + '-' + day
    }

    // ???????????????????????????
    getwatch = (number) => {
        if(number > 10000) {
            let kilo = number / 10000
            return kilo.toFixed(1) + "???"
        }else {
            return number
        }
    } 

    // ??????????????????  ???????????????????????????????????????????????????
    changePage = (page, pageSize) => {
        this.setState({
            pageNumber: page,
            page: 2
        })
        if(page === 1) {
            this.setState({
                page: 1
            })
        }
        let keyword = this.state.keyword
        let Node = document.getElementById("results")
        Node.scrollTop = 0
        this.setPageinfo(keyword, page)
    }

    saveAvid = (aid) => {
        store.dispatch(createIdAction(aid))
    }

    setfanjuinfo = (season_id, index) => {
        store.dispatch(createSeasonid(season_id))
        store.dispatch(createEp(index))
    }

    render() {
        const { web_game,card, media_bangumi, media_ft, bili_user, user, star, video, numberPages, pageNumber,page } = this.state
        console.log(media_bangumi)
        return (
                <div className="comprehensive">
                    <div className="mixin-list">
                        <ul className="game-list" style={ page === 1 ? { } : { display: 'none' } }>
                            {
                                (web_game || []).map((game) => {
                                    return(
                                        <li className="game-item" key={game.game_name}>
                                        <a className="cover-img">
                                            <div className="lazy-img">
                                                <img src={ game.game_icon } />
                                            </div>
                                        </a>
                                        <div className="bili-info">
                                            <span className="handline cardhead">
                                                <span className="type">??????</span>
                                                <a className="title">{ game.game_name }</a>
                                                <div className="grade-wrap">
                                                    <div className="player-grade">
                                                        ????????????:
                                                        <span className="grade">{ game.grade }</span>
                                                        <span className="grade-text">???</span>
                                                    </div>
                                                </div>
                                            </span>
                                            <p className="desc">
                                                ??????: Android???ios
                                            </p>
                                            <p className="desc">
                                                ???????????????{ game.summary }
                                            </p>
                                            <div className="btn-wrap">
                                                <div className="btn-bili primary">??????</div>
                                                <div className="btn-bili default">
                                                    ??????
                                                    <span>({ this.getwatch(game.comment_num) }???)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    )
                                })
                            }
                        </ul>
                        <ul className="bangumi-list"  style={ page === 1 ? { } : { display: 'none' }}>
                            {
                                (media_bangumi || []).map((bangumi) => {
                                    return(
                                        <li className="bangumi-item" key={bangumi.fix_pubtime_str}>
                                            <div className="bangumi-item-wrap">
                                                <a href="#" className="left-img">
                                                    <div className="lazy-img">
                                                        <img src={ bangumi.cover } alt="" />
                                                    </div>
                                                    <div className="bangumi-tag">??????</div>
                                                </a>
                                                <div className="right-info">
                                                    <div className="headline">
                                                        <span className="bangumi-label">??????</span>
                                                        <a href="#" className="title" dangerouslySetInnerHTML={{__html: bangumi.title}}>
                                                            {/* <em className="keyword">??????</em>?????? */}
                                                            {/* { bangumi.title } */}
                                                        </a>
                                                    </div>
                                                    <div className="intros">
                                                        <div className="line clearfix">
                                                            <div className="left-block">
                                                                <span className="label">??????:</span>
                                                                <span className="value">{ bangumi.styles }</span>
                                                            </div>
                                                            <div className="right-block">
                                                                <span className="label">??????:</span>
                                                                <span className="value">{ bangumi.areas }</span>
                                                            </div>
                                                        </div>
                                                        <div className="line clearfix">
                                                            <div className="left-block">
                                                                <span className="label">????????????:</span>
                                                                <span className="value">{ bangumi.fix_pubtime_str }</span>
                                                            </div>
                                                            <div className="right-block">
                                                                <span className="label">??????:</span>
                                                                <span className="value">
                                                                    { bangumi.cv }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="desc">
                                                            { bangumi.desc }
                                                        </div>
                                                    </div>
                                                    <div className="grid">
                                                        <ul className="epbox clearfix grid">

                                                            {
                                                                (bangumi.eps).map((count, index) => {
                                                                    return(
                                                                        <li className="ap-sub" key={index}>
                                                                            <NavLink to={'/bilibili/Search/playerfanju'}>
                                                                                <div onClick={ () => this.setfanjuinfo(bangumi.season_id, index+1) } className="ap-item">{ index + 1 }</div>
                                                                            </NavLink>
                                                                        </li>
                                                                    )
                                                                })
                                                            }

                                                        </ul>
                                                    </div>
                                                    <div className="score">
                                                        <div className="score-num">
                                                            { bangumi.media_score.score }
                                                            <span className="fen">
                                                                ???
                                                            </span>
                                                        </div>

                                                        <div className="user-count">
                                                            { this.getwatch(bangumi.media_score.user_count) }?????????
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <ul className="user-list"  style={ page === 1 ? { } : { display: 'none' }}>
                            {
                                bili_user.map((user) => {
                                    return(
                                        <div className="user-item" key={user.videos}>
                                        <div className="up-face">
                                            <a href="#" className="face-img">
                                                <div className="lazy-img">
                                                    <img src={ user.upic } alt="" />
                                                </div>
                                            </a>
                                            <i className="verify-icon icon-official"></i>
                                        </div>
                                        <div className="info-wrap">
                                            <div className="headline">
                                                <a href="#" className="title">{ user.uname }</a>
                                                <a href="#" className="lv icon-lv6"></a>
                                                <a href="#" className="attention-btn followed">?????????</a>
                                                <div className="feedback">
                                                    <div className="up-feedback">
                                                        <i className="icon-beta"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="up-info clearfix">
                                                <span>??????: { user.videos }</span>
                                                <span>??????: { this.getwatch(user.fans) }</span>
                                            </div>
                                            <div className="desc">
                                                { user.official_verify.desc }
                                            </div>
                                            <div className="up-videos clearfix">
                                                <div className="up-videos clearfix">
                                                    {
                                                        (user.res).map((info) => {
                                                            return(
                                                                <div className="video-item">
                                                                <a href="#" className="video-pic default-img-small">
                                                                    <div className="lazy-img">
                                                                        <img src={ info.pic } alt="" />
                                                                    </div>
                                                                    <div className="watch-later-trigger watch-later"></div>
                                                                </a>
                                                                <div className="video-info">
                                                                    <a href="#" className="video-desc">
                                                                    { info.title }
                                                                    </a>
                                                                    <span className="ptime">
                                                                        { this.gettime(info.pubdate) }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            )
                                                        })
                                                    }
                                                    <a href="#" className="video-more">
                                                        ??????{user.videos}?????????&gt;
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </ul>

                        <ul className="video-list" clearfix>
                            {
                                video.map((videoInfo) => {
                                    return(
                                        <li className="video-item matrix" key={videoInfo.play}>
                                        <NavLink  to={'/bilibili/Search/playervideo'} className="img-anchor">
                                            <div className="img" onClick={ () => this.saveAvid(videoInfo.aid) }>
                                                <div className="lazy-img">
                                                    <img src={ videoInfo.pic } alt="" />
                                                    <span className="so-imgTag_rb"></span>
                                                    <div className="watch-later-trigger watch-later"></div>
                                                    <span className="mask-video"></span>
                                                </div>
                                                
                                                <div className="van-framepreview">
                                                    <div className="van-fpbar-box">
                                                        <span></span>
                                                    </div>
                                                </div>
                                                <div className="van-danmu"></div>
                                            </div>
                                        </NavLink>
                                        <div className="video-info">
                                            <div className="headline clearfix">
                                                <span className="type hide">{ videoInfo.typename }</span>
                                                <a href="#" className="title"  dangerouslySetInnerHTML={{__html: videoInfo.title}}></a>
                                                <div className="des hide">???????????????????????????????????????</div>
                                                <div className="tags">
                                                    <span className="so-icon watch-num">
                                                        <i className="icon-playtime"></i>
                                                        { this.getwatch(videoInfo.play) }
                                                    </span>
                                                    <span className="so-icon hide">
                                                        <i className="icon-subtitle"></i>
                                                        0
                                                    </span>
                                                    <span className="so-icon time">
                                                        <i className="icon-date"></i>
                                                        { this.gettime(videoInfo.pubdate) }
                                                    </span>
                                                    <span className="so-icon">
                                                        <i className="icon-uper"></i>
                                                        <a href="#" className="up-name">
                                                            { videoInfo.author }
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="so-imgTag_rb">{ videoInfo.duration }</span>
                                    </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className="pagi-contain">
                        <Pagination onChange={ this.changePage } current={pageNumber} showSizeChanger={false} defaultCurrent={pageNumber} total={numberPages * 10} />
                    </div>
            </div>
        );
    }
}
