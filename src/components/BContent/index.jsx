import React, { Component } from 'react';
import { NavLink, Route, Redirect} from 'react-router-dom'

import PubSub from 'pubsub-js';
import AnimatedRouter from 'react-animated-router'

import New from '../../page/BiliBili/New'
import Live from '../../page/BiliBili/Live'
import player from '../Player'
import Dynamic from '../../page/BiliBili/Dynamic'
import Search from '../../page/BiliBili/Search'
import results from '../../page/BiliBili/Search/results'
import playervideo from '../Playervideo'
import playerfanju from '../PlayerFanju'

import 'react-animated-router/animate.css'
import './index.scss'

export default class index extends Component {
    state = { cookie: "", userid: "" }

    componentDidMount() {
        this.mysub = PubSub.subscribe('mytopc', (msg, data) => {
                this.setState({
                    cookie: data.cookie,
                    userid: data.mid
                })
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.mysub)
    }

    render() {  
        const  { cookie, userid }  = this.state
        return (
            <div className="main-container" key={this.props.location.key}>
            <div className="main-header">
                <div className="header-menu">
                    <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/bilibili/New',state: {cookie} }}>最新</NavLink>
                    <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/bilibili/Dynamic', state: { cookie, userid } }} >动态</NavLink>
                    <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/bilibili/Live',state: {cookie} }}>直播</NavLink>
                    <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/bilibili/Search'}}>搜索</NavLink>
                </div>
            </div>
            
            {/* switch包裹路由  设置默认匹配项 */}
                <AnimatedRouter>
                    <Route exact path="/bilibili/New" component={ New } />
                    <Route exact path="/bilibili/Dynamic" component={ Dynamic } />
                    <Route exact path="/bilibili/Live" component={ Live } />
                    <Route exact path="/bilibili/Live/player" component={ player } />
                    <Route exact path="/bilibili/Search" component={ Search  } />
                    <Route exact path="/bilibili/Search/playervideo" component={ playervideo } />
                    <Route path="/bilibili/Search/results/comprehensive" component={ results }></Route>
                    <Route path="/bilibili/Search/playerfanju" component={ playerfanju } />
                    <Redirect to="/bilibili/New" />
                </AnimatedRouter>
           </div>
        );
    }
}