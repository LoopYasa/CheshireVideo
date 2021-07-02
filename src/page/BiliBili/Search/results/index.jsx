import axios from 'axios';
import React, { Component } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';

import AnimatedRouter from 'react-animated-router'
import { localStorageGet, localStorageSet } from '../../../../StorageGS';
import Comprehensive from './pages/Comprehensive'
import playervideo from '../../../../components/Playervideo'


import './index.scss'

export default class index extends Component {
    state = {
        transformLeft: 37,
        leftNumber: 37,
        showNumber: 1,
        keyword: '',
        pageNumber: ''
    }
    
    componentDidMount() {
        
        if(this.props.location.search !== ""){
            if((this.props.location.search.indexOf("%") == -1)){
                localStorageSet("keyword", this.props.location.search.slice(9).split("&")[0])
                this.setState({
                    keyword: this.props.location.search.slice(9).split("&")[0]
                })
            }else {
                this.setState({
                    keyword: localStorageGet("keyword")
                })
            }
            
        } else {
            this.setState({
                keyword: localStorageGet("keyword")
            })
        }
    }

    // 设置用户鼠标滑动区域下划线高亮
    changeActive = (number) => {
        if(number === 1) {
            this.setState({
                transformLeft: 37
            })
        }else {
            this.setState({
                transformLeft: 37 + (number - 1) * 128.25 
            })
        }
        
    }

    // 设置下划线左边距  并保存展示的相对导航块
    setActive = (item) => {
        if(item === 1) {
            this.setState({
                leftNumber: 37,
                showNumber: item
            })
        }else {
            this.setState({
                leftNumber: 37 + (item - 1) * 128.25,
                showNumber: item
            })
        }
    }

    // 设置点击保存的下划线提示的左边距
    setLeftnumber = () => {
        const { leftNumber } = this.state
        this.setState({
            transformLeft:leftNumber
        })
    }

    // 为input设置值后无法改变  需要进行绑定修改
    setChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }
    render() {
        const { transformLeft, showNumber, keyword } = this.state
        return (
            <div className="results" id="results">
                <div className="contain">
                    <div className="head-contain">
                        <div className="search-wrap">
                            <div className="logo-input clearfix">
                                <a href="#" className="search-logo"></a>
                                <div className="search-block">
                                    <div className="input-wrap">
                                        <input type="text" value={ keyword } onChange={ (e) => this.setChange(e) } maxLength="100" autoComplete="off" id="search-keyword" />
                                    </div>
                                    <div className="search-button">
                                        <i className="icon-search-white"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="navigator">
                            <div className="switcher-header-wrap">
                                <div className="switcher-tabs">
                                    <ul className="switcher-header" onMouseLeave={ this.setLeftnumber }>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(1) } onMouseOver={ () => this.changeActive(1) }>
                                            <NavLink style={showNumber === 1 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>综合<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(2) } onMouseOver={ () => this.changeActive(2) }>
                                            <NavLink style={showNumber === 2 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>视频<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(3) } onMouseOver={ () => this.changeActive(3) }>
                                            <NavLink style={showNumber === 3 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>番剧<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(4) } onMouseOver={ () => this.changeActive(4) }>
                                            <NavLink style={showNumber === 4 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>影视<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(5) } onMouseOver={ () => this.changeActive(5) }>
                                            <NavLink style={showNumber === 5 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>直播<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(6) } onMouseOver={ () => this.changeActive(6) }>
                                            <NavLink style={showNumber === 6 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>专栏<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(7) } onMouseOver={ () => this.changeActive(7) }>
                                            <NavLink style={showNumber === 7 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>话题<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-item" onClick={ () => this.setActive(8) } onMouseOver={ () => this.changeActive(8) }>
                                            <NavLink style={showNumber === 8 ? {color:'#00a1d6'}: {}} className='change-nav' activeClassName='router-active' to={`/bilibili/Search/results/comprehensive?keyword=${keyword}`}>用户<span className="num" ></span></NavLink>
                                        </li>

                                        <li className="switcher-header-anchor" style={{ transform: `translateX(${transformLeft}px)` }}></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="body-contain">
                        <AnimatedRouter>
                            <Route path="/bilibili/Search/results/comprehensive" component={Comprehensive} />
                            <Redirect to="/bilibili/Search/results/comprehensive" />
                        </AnimatedRouter>
                    </div>
                </div>
            </div>
        )
    }
}