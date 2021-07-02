import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { localStorageSet, localStorageGet } from '../../../StorageGS'
import Loading from '../../SoumanLoading'

import './index.scss'

export default class magent extends Component {

    state = {
        fixed: false,
        results: [],
        itemNumber: 0,
        sourceNumber: 0,
        isreveal: "",
        isShow: true
    }
    componentDidMount() {
        const _this = this

        // 为当前组件界面绑定滚动事件
        window.addEventListener('scroll',this.handleScroll, true)
        
        // 获取serach界面传过来的key值并进获取搜索结果
        let key = this.props.location.search.slice(5)
        if(key.search("%") === -1) {
            localStorageSet("key", key)
        }else {
            key = localStorageGet("key")
        }
        axios.get('http://localhost:3001/api/results', { params: {
            key
        } })
        .then(function (response) {
            let result = response.data.Items
            console.log(response)
            let array = []
            for (var key in result ) {
                array.push(result[key])
            }
            _this.setState({
                results: array,
                isShow: false
            })
        })
        .catch(function (err) {
            console.log(err)
        })

        
    }

    // 组件卸载时移除绑定事件
    componentWillUnmount() {
        window.removeEventListener('scroll',this.handleScroll)
    }

    // 绑定滚动事件调用函数
    handleScroll = (event) => {
        let _this = this
        let scrollTop = event.target.scrollTop
        if(scrollTop >= 220) {
            _this.setState({
                fixed: true
            })
        }else {
            _this.setState({
                fixed: false
            })
        }
    }

    setResource = (itemNumber,sourceNumber) => {
        this.setState({
            itemNumber,
            sourceNumber
        })
    }

    render() {
        // 判断是否固定header
        let { fixed, results, itemNumber, sourceNumber, isShow } = this.state
        let pltext = localStorageGet("key")
        let style = {}
        if(fixed) {
            style = { 
                position:"fixed",
                transition: "0.3s ease",
                backgroundColor:"rgba(255,255,255,0.95)",
                opacity: 0.95,
                margin: 0,
                padding: 0,
                borderBottom: "2px solid #ff6348",
                boxShadow: "0 10px 10px rgb(255 159 127 / 69%)"
            }
        }else {
            style = { 
            }
        }
        return (
            <div className="results-container"> 
                <div className="results-header">
                    <div className="input-form">
                        <input type="text" placeholder={ pltext } />
                        <button className="main-form-btn" to={ `/souman/search/?key=$` } >搜索</button>
                    </div>
                </div>

                <div className="loadingpage" style={ isShow ? {display:'flex'} : {display:'none'}}>
                    <Loading></Loading>
                </div>

                <div className="results-main" style={ !isShow ? {display:'flex'} : {display:'none'}}>
                    <div className="results-main_container">

                        {
                            // 渲染搜索出来的结果并遍历信息
                            results.map((infos, index1) => {
                                let index3 = 0
                                if(index1 === itemNumber) {
                                    index1 = itemNumber
                                    index3 = sourceNumber
                                }
                                return(
                                    <div className="results-item">
                                        <img src= { results[index1].Comics[index3].PicUrl } />
                                        <div className="item-info">
                                            <p className="manga-item-title">
                                                <span>
                                                    { results[index1].Comics[index3].Title }
                                                </span>
                                            </p>

                                            <p className="manga-item-line">
                                                <span>
                                                    作者: { results[index1].Comics[index3].Author }
                                                </span>
                                            </p>

                                            <p className="manga-item-line">
                                                <span>
                                                    状态: { results[index1].Comics[index3].Status }
                                                </span>
                                                <span>
                                                    更新至: { results[index1].Comics[index3].LastPartName }
                                                </span>
                                            </p>

                                            <p className="manga-item-line">
                                                <span className="manga-content">
                                                    { results[index1].Comics[index3].Content }
                                                </span>
                                            </p>

                                            <div className="type-block-con">
                                                {
                                                    // 渲染相关漫画资源条目
                                                    (infos.Comics).map((source, index2) => {
                                                        let reveal = false
                                                        if(index1 === itemNumber && index2 === sourceNumber) {
                                                            reveal = true
                                                        }
                                                        return(
                                                            <span className="tab-con">
                                                                <a className={ reveal ? 'is-reveal' : '' } onClick={ ()  => this.setResource(index1, index2)}>{ source.Source }</a>
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <p className="manga-item-num">
                                                {
                                                     (results[index1].Comics[index3].Chapters.length < 7) ? results[index1].Comics[index3].Chapters.map((count => {
                                                            return(
                                                                <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }`}>{ count.Name }</NavLink>
                                                            )
                                                     })) : <div>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[0].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[1].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[2].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[3].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[4].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[5].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[6].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[7].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >. . .</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 9].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 8].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 7].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 6].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 5].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 4].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 3].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 2].Name }</NavLink>
                                                     <NavLink to={ `/souman/reader/?id=${ results[index1].Comics[index3].Chapters[0].Url.slice(0,-1) }` } >{ results[index1].Comics[index3].Chapters[results[index1].Comics[index3].Chapters.length - 1].Name }</NavLink>
                                                 </div>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                                // return(
                                //     (infos.Comics).map((info) => {
                                //         return(
                                            
                                //         )
                                //     })
                                // )
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
}