import React, { Component } from 'react';
import { NavLink, Route, Redirect, Switch} from 'react-router-dom'

import AnimatedRouter from 'react-animated-router'

import Complete from './Categorypages/complete'
import Manufacture from './Categorypages/manufacture'

import './index.scss'

export default class index extends Component {
    state = {
        isActive: 1
    }

    setActive = (number) => {
        this.setState({
            isActive: number
        })
    }
    render() {
        const { isActive } = this.state

        return (
            <div className="hpoi-container">
                <div className="box-title">
                    <ul className="hpoi-switch-header">
                        <NavLink to={{pathname: '/hpoi/Main/complete'}} className="hpoi-switcher-header-item" style={ isActive === 1 ? { borderBottom: '2px solid #00a1d6' } : {} } onClick={ () => this.setActive(1) }>全部</NavLink>
                        <NavLink to={{pathname: '/hpoi/Main/manufacture'}} className="hpoi-switcher-header-item" style={ isActive === 2 ? { borderBottom: '2px solid #00a1d6' } : {} } onClick={ () => this.setActive(2) }>制作</NavLink>
                        <NavLink to={{pathname: '/hpoi/Main/complete'}} className="hpoi-switcher-header-item" style={ isActive === 3 ? { borderBottom: '2px solid #00a1d6' } : {} } onClick={ () => this.setActive(3) }>更图</NavLink>
                        <NavLink to={{pathname: '/hpoi/Main/complete'}} className="hpoi-switcher-header-item" style={ isActive === 4 ? { borderBottom: '2px solid #00a1d6' } : {} } onClick={ () => this.setActive(4) }>开订</NavLink>
                        <NavLink to={{pathname: '/hpoi/Main/complete'}} className="hpoi-switcher-header-item" style={ isActive === 5 ? { borderBottom: '2px solid #00a1d6' } : {} } onClick={ () => this.setActive(5) }>延期</NavLink>
                        <NavLink to={{pathname: '/hpoi/Main/complete'}} className="hpoi-switcher-header-item" style={ isActive === 6 ? { borderBottom: '2px solid #00a1d6' } : {} } onClick={ () => this.setActive(6) }>出荷</NavLink>
                        <NavLink to={{pathname: '/hpoi/Main/complete'}} className="hpoi-switcher-header-item" style={ isActive === 7 ? { borderBottom: '2px solid #00a1d6' } : {} } onClick={ () => this.setActive(7) }>再版</NavLink>
                    </ul>
                </div>

                <div className="box-content">
                    <AnimatedRouter>
                        <Route path="/hpoi/Main/complete" component={ Complete }></Route>
                        <Route path="/hpoi/Main/manufacture" component={ Manufacture }></Route>
                        <Redirect to="/hpoi/Main/complete" />
                    </AnimatedRouter>
                </div>
            </div>
        )
    }
}
