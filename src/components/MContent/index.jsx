import React, { Component } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom'

import AnimatedRouter from 'react-animated-router'

import magent from '../../page/Mikan/Magent'
import main from '../../page/Mikan/Main'

import 'react-animated-router/animate.css'
import './index.scss'

export default class index extends Component {


    render() {  
        return (
            <div className="main-container">
            <div className="main-header">
             <div className="header-menu">
              <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/mikan/main' }}>首页</NavLink>
              <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/mikan/magent' }}>下载</NavLink>       
             </div>
            </div>
            
            {/* switch包裹路由  设置默认匹配项 */}
            <AnimatedRouter>
                <Route exact path="/mikan/magent" component={ magent } />
                <Route exact path="/mikan/main" component={ main } />
                <Redirect to="/mikan/main" />
            </AnimatedRouter>
           </div>
        );
    }
}