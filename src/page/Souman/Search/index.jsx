import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './index.scss'

export default class magent extends Component {

    state = {
        search: ""
    }

    inputChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    render() {
        let key = this.state.search

        return (
            <div className="souman-main-container">
            {/* <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/mikan/main' }}>首页</NavLink>
            <NavLink activeClassName="is-active" className="main-header-link" to={{ pathname: '/mikan/magent' }}>下载</NavLink>        */}
                <div className="container_mid">
                    <div className="input-form">
                        <input type="text" onChange={ this.inputChange } />
                        <NavLink className="main-form-btn" to={ `/souman/search/?key=${ key }` } >搜索</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}