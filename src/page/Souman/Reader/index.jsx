import axios from 'axios';
import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';

import { Menu, Dropdown, Button } from 'antd'
import { message } from 'antd';
import AnimatedRouter from 'react-animated-router'
import LongMenu from '../../../components/LongMenu'
import Popover from '@material-ui/core/Popover'

import './index.scss'

export default class reader extends Component {

    state = {
        day : "",
        hour : "",
        second : "",
        sign : "",
        count : "",
        mid : "",
        page: "",
        pageSign: "",
        curl: "",
        pageNumber: 1,
        origin: ""
    }

    componentDidMount() {
        const _this = this
        let curl = this.props.location.search.slice(-6)
        axios.get('http://localhost:3001/api/firstinfo', {
            params: {
                curl
            }
        })
        .then( function(response) {
                let day = response.data.day
                let hour = response.data.hour
                let second = response.data.second
                let sign = response.data.result
                let count = response.data.count
                let mid = response.data.mid
            _this.setState({
                day: response.data.day,
                hour: response.data.hour,
                second: response.data.second,
                sign: response.data.result,
                count: response.data.count,
                mid: response.data.mid,
                curl: curl.slice(-5),
                origin: curl
            })
            axios.get('http://localhost:3001/api/getpage',{
                params: {
                    curl,
                    mid,
                    day,
                    hour,
                    second,
                    sign,
                }
            })
            .then( function(response) {
                let page = response.data.page
                let pageSign = response.data.pageSign
                _this.setState({
                    page,
                    pageSign
                })
            })
            .catch( function(err) {
                console.log(err)
            })
        })
        .catch( function(err) {
            console.log(err)
        })
    }

    // 用户点击当前页漫画后自动跳转下一页
    nextpage = (event) => {
        const _this = this
        const { curl, mid, day, hour, second, sign, pageNumber } = this.state
        axios.get('http://localhost:3001/api/getNumberpage', {
            params: {
                curl,
                mid,
                day,
                hour,
                second,
                sign,
                pageNumber
            }
        })
        .then(function(response) {
            _this.setState({
                page: response.data
            })
        })
        .catch(function(err) {
            console.log(err)
        })
        _this.setState({
            pageNumber: pageNumber + 1
        })
        let Node = document.getElementById("content")
        Node.scrollTop = 0
    }

    // 传递给hooks函数式组件的调用函数  用于获取用户点击的相对于页数
    getpage = (pageNumber) => {
        const _this = this
        const { curl, mid, day, hour, second, sign } = this.state
        axios.get('http://localhost:3001/api/getNumberpage', {
            params: {
                curl,
                mid,
                day,
                hour,
                second,
                sign,
                pageNumber
            }
        })
        .then(function(response) {
            console.log(response.data)
            _this.setState({
                pageNumber,
                page: response.data
            })
        })
        .catch(function(err) {
            console.log(err)
        })
        let Node = document.getElementById("content")
        Node.scrollTop = 0
    }

    setNextChapter = () => {
        const _this = this
        let chapter = Number.parseInt(this.state.curl) + 1
        axios.get('http://localhost:3001/api/firstinfo', {
            params: {
                curl: 'm' + chapter
            }
        })
        .then( function(response) {
                let day = response.data.day
                let hour = response.data.hour
                let second = response.data.second
                let sign = response.data.result
                let count = response.data.count
                let mid = response.data.mid
            _this.setState({
                day: response.data.day,
                hour: response.data.hour,
                second: response.data.second,
                sign: response.data.result,
                count: response.data.count,
                mid: response.data.mid,
                curl: chapter
            })
            axios.get('http://localhost:3001/api/getpage',{
                params: {
                    curl: chapter,
                    mid,
                    day,
                    hour,
                    second,
                    sign,
                }
            })
            .then( function(response) {
                let page = response.data.page
                let pageSign = response.data.pageSign
                _this.setState({
                    page,
                    pageSign,
                    pageNumber: 1
                })
            })
            .catch( function(err) {
                console.log(err)
            })
        })
        .catch( function(err) {
            console.log(err)
        })
    }

    preChapter = () => {
        let _this = this
        let origin = this.state.origin.slice(-5)
        let chapter = this.state.curl
        console.log(origin,chapter)
        if( Number.parseInt(chapter) - Number.parseInt(origin) !== 0 ) {
            const _this = this
            let chapter = Number.parseInt(this.state.curl) - 1
            axios.get('http://localhost:3001/api/firstinfo', {
                params: {
                    curl: 'm' + chapter
                }
            })
            .then( function(response) {
                    let day = response.data.day
                    let hour = response.data.hour
                    let second = response.data.second
                    let sign = response.data.result
                    let count = response.data.count
                    let mid = response.data.mid
                _this.setState({
                    day: response.data.day,
                    hour: response.data.hour,
                    second: response.data.second,
                    sign: response.data.result,
                    count: response.data.count,
                    mid: response.data.mid,
                    curl: chapter
                })
                axios.get('http://localhost:3001/api/getpage',{
                    params: {
                        curl: chapter,
                        mid,
                        day,
                        hour,
                        second,
                        sign,
                    }
                })
                .then( function(response) {
                    let page = response.data.page
                    let pageSign = response.data.pageSign
                    _this.setState({
                        page,
                        pageSign,
                        pageNumber: 1
                    })
                })
                .catch( function(err) {
                    console.log(err)
                })
            })
            .catch( function(err) {
                console.log(err)
            })
        }else {
            message.warning("没有上一章了哦( ･´ω`･ )")
        }
    }

    render() {

        const { mid, curl, page, pageSign, count, pageNumber } = this.state

        return (
            <div className="reader">

                <div className="readercontent" id="content" onClick={ () => this.nextpage() }>
                    <img src={ `http://image.mangabz.com/1/${mid}/${curl}/${page}.jpg?cid=${curl}&key=${pageSign}=` } alt="" />
                </div>

                <div className="bottom">
                    {/* 页面伸缩菜单栏  显示漫画对应页数  用户点击进行跳转 */}
                    <LongMenu count = { count } pageNumber = { pageNumber } getpage = {this.getpage} />
                    <div>
                    <button className="preChaper" onClick={ () => this.preChapter() }>上一章</button>
                    <button onClick={ () => this.setNextChapter() }>下一章</button>
                    </div>
                </div>

            </div>
        );
    }
}