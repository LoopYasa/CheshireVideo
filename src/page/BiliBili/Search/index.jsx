import React, { Component } from 'react';
import { NavLink, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import store from '../../../redux/store'
import { createKeywordAction } from '../../../redux/action'

import AnimatedRouter from 'react-animated-router'
import playervideo from '../../../components/Playervideo'
import playerfanju from '../../../components/PlayerFanju'
import { localStorageGet, localStorageSet } from '../../../StorageGS';

import results from './results'

import './index.scss'

export default class index extends Component {

    state = {
        isShow: false,
        searchHistory: [],
        keyword: ''
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({})
        })
        if(localStorageGet("searchHistory") !== null) {
            this.setState({
                searchHistory: JSON.parse(localStorageGet("searchHistory"))
            })
        }
        // let script2 = document.createElement('script')
        // script2.type = 'text/javascript'
        // script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TimelineLite.min.js'
        // document.getElementById('root').appendChild(script2)

        // let script3 = document.createElement('script')
        // script3.type = 'text/javascript'
        // script3.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenLite.min.js'
        // document.getElementById('root').appendChild(script3)

        // let script4 = document.createElement('script')
        // script4.type = 'text/javascript'
        // script4.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js'
        // document.getElementById('root').appendChild(script4)

        // let script = document.createElement('script')
        // script.type = 'text/javascript'
        // script.src = 'http://81.71.103.97/swiper/search.js'
        // document.getElementById('root').appendChild(script)

    }

    // 打开历史搜索记录
    showSearchhistory = () => {
        this.setState({
            isShow: true
        })
    }

    // 关闭历史搜索记录
    closeSearchhistory = () => {
        this.setState({
            isShow: false
        })
    }

    // 点击搜索  存储搜索记录
    Search = () => {
        let {searchHistory, keyword} = this.state
        if(keyword !== ''){
            if(searchHistory.length === 10) {
                searchHistory.pop()
            }
            localStorageSet("searchHistory", JSON.stringify([keyword,...searchHistory]))
        }
        store.dispatch(createKeywordAction(keyword))
    }

    // 将搜索词条保存本地
    inputChange = (e) => {
        // 使用input默认value之后无法通过键盘更改  一下keyword与value互通后即可解决
        this.setState({
            keyword: e.target.value
        })
    }

    // 删除指定搜索信息
    deleHistory = (index) => {
        let searchHistory = this.state.searchHistory
        searchHistory.splice(index, 1)
        this.setState({
            searchHistory 
        })
        localStorageSet("searchHistory", JSON.stringify(searchHistory))
    }

    // 使用历史搜索记录
    setInput = (item) => {
        this.setState({
            keyword: item,
            isShow: false
        })
    }

    render() {
        const {isShow, searchHistory, keyword } = this.state
        return (
            <div>

                <Router>

                    <AnimatedRouter>

                        <Route exact path="/bilibili/Search" render={ () => {
                            return(
                                <div className="search">
                                <div className="search-mask"  onClick={ this.closeSearchhistory }  style={isShow ? {display:'block'} : {display:'none'}}></div>
                                {/* 伸缩搜索框
                                <form class="search">
                                    <input class="search-input" id="input" type="text" autocomplete="off"/>
                                    <label class="search-label" for="input"></label>
                                    <button class="search-button" type="reset"></button>
                                    <div class="search-border"></div>
                                    <div class="search-btn">搜索</div>
                                    <div class="search-close">x</div>
                                </form> */}
                
                                <div className="nav-search-box">
                                    <form id="nav_searchform">
                                        <input className="nav-search-keyword" value={ keyword } onChange={ (e) => this.inputChange(e) } onFocus={ this.showSearchhistory } type="text" />
                                        <div className="nav-search-btn">
                                            <NavLink className="bilifont bili-icon_dingdao_sousuo nav-search-submit" onClick={ () => this.Search() }  to={`/bilibili/Search/results`} ></NavLink>{/*/comprehensive?keyword=${keyword}&page=${1} */}
                                        </div>
                                    </form>
                                    <ul id="bilibili-search-history" style={isShow && searchHistory.length !== 0 ? {display:'block'} : {display:'none'}} className="bilibili-search-history report-wrap-module history">
                                        {
                                            (searchHistory || []).map((item, index) => {
                                                return(
                                                    <li className="history-item" onClick={ () => this.setInput(item) }>
                                                        <a>{ item }</a>
                                                        <i className="bilifont bili-icon_sousuo_yichu cancel-icon" onClick={ () => this.deleHistory(index) }></i>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            )
                        } }></Route>

                        <Route path="/bilibili/Search/results" component={ results }></Route>
                        <Route path="/bilibili/Search/playervideo" component={ playervideo } />
                        <Route path="/bilibili/Search/playerfanju" component={ playerfanju } />
                        <Redirect to="/bilibili/Search/results" />
                    </AnimatedRouter>

                </Router>

            </div>
        )
    }
}
