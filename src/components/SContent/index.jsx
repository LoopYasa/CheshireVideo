import React, { Component } from 'react';
import { NavLink, Route, BrowserRouter as Router } from 'react-router-dom'

import AnimatedRouter from 'react-animated-router'

import Results from '../../page/Souman/Results'
import Search from '../../page/Souman/Search'
import Reader from '../../page/Souman/Reader'

import 'react-animated-router/animate.css'
import './index.scss'

export default class index extends Component {

 

    render() {  
        return (
            <div>
                {/* 渲染搜索界面或者搜索结果界面 */}
                <Router>
                    <AnimatedRouter>
                        <Route exact path="/souman" component={ Search }></Route>
                        <Route path="/souman/search" component={ Results }></Route>
                        <Route path="/souman/reader" component={ Reader }></Route>
                    </AnimatedRouter>
                </Router>
            </div>
        );
    }
}