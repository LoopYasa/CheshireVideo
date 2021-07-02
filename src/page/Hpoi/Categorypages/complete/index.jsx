import React, { Component } from 'react';
import axios from 'axios'

import './index.scss'
export default class index extends Component {

    state = {
        results: []
    }

    componentDidMount() {
        const _this = this
        axios.get('http://localhost:3001/api/gethpoiinfo', { params: {
            subType: "preorder"
        } })
        .then(function(response) {
            _this.setState({
                results: response.data
            })
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    render() {

        const { results } = this.state

        return (
            <div className="complete-container">
                
                {
                     results.map((info) => {
                        return(
                            <div className="content-item">
                                <div className="left">
                                    <span>{ info.spaninfo }</span>
                                    <a href="#">
                                        <img src={ info.img } alt="" />
                                    </a>
                                </div>
                                <div className="right">
                                    <div>
                                        <span>出荷时间</span>
                                        <span>{ info.time }</span>
                                    </div>
                                    <div>
                                        <span>情报</span>
                                    </div>
                                    <div className="hpoi-hr-small"></div>
                                    <div>{ info.info }</div>
                                    <div>{ info.bottom }</div>
                                </div>
                            </div>
                        )
                     })
                }

            </div>
        )
    }
}
