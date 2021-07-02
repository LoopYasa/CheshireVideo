import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'

import BContent from './components/BContent'
import MContent from './components/MContent'
import SContent from './components/SContent'
import HContent from './components/HContent'
import AnimatedRouter from 'react-animated-router'
import TopNav from './components/TopNav'
import LeftNav from './components/LeftNav'

import './App.scss'

export default class App extends Component {
  render() {
    return (
      <div className="app" id="app" style={{ backgroundImage: "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)" }}>
        <TopNav/>
        <div className="wrapper">
          <LeftNav/>
          {/* <Content/> */}
          {/* 分开的两个组件之间的路由实现  头部单独组件
          点击  下面content部分进行相应的路由跳转 */}
          <AnimatedRouter>
            <Route path="/bilibili" component={ BContent }></Route>
            <Route path="/mikan" component={ MContent }></Route>
            <Route path="/souman" component={ SContent }></Route>
            <Route path="/hpoi" component={ HContent }></Route>
            <Redirect to="/bilibili" />
          </AnimatedRouter>
        </div>
      </div>
    )
  }
}