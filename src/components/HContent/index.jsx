import React, { Component } from 'react';
import { NavLink, Route, Redirect, Switch} from 'react-router-dom'

import AnimatedRouter from 'react-animated-router'

import Main from '../../page/Hpoi'

import './index.scss'

export default class index extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="main-header">
                    <div className="header-menu">
                        <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/hpoi/Main' }}>主页</NavLink>
                    </div>
                </div>

                <Switch>
                    <Route path="/hpoi/Main" component={ Main } />
                    <Redirect to="/hpoi/Main/complete" />
                </Switch>
            </div>
        )
    }
}