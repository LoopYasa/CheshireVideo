import axios from 'axios';
import React, { Component } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message, BackTop } from 'antd'

import Catloading from '../../Mikanloading'
import './index.scss'

export default class magent extends Component {

    state = {
        magents: [],
        isShow: true
    }

    componentDidMount() {
        const _this = this
        axios.get("http://localhost:3001/api/magent")
        .then(function (response) {
            _this.setState({
                magents: response.data,
                
            })
            _this.setState({
                isShow: false
            })
        })
        .catch(function (err) {
            console.log(err)
        })
    }

    render() {
        const { magents, isShow } = this.state

        return (
            <div style={{height:"100%",width:"100%"}}>

            <div style={isShow ? {display:"block"}:{display:"none"}}>
                <Catloading></Catloading>
            </div>
            
            <div className="magnet-container" id="magnet-container"> 

                <BackTop visibilityHeight={300} target ={()=>document.getElementById('magnet-container')} >
                    <div className="backtopbtn" ></div>
                </BackTop>
            {     
                magents.map((magent) => {
                    return(
                        <div className="magent-card">
                            <div className="magent-card-top">
                                <div className="magent-card__subtext">
                                    <span className="time">{ magent.time }</span>
                                    <span className="auth">{ magent.auth }</span>
                                    <span className="magent">{ magent.name }</span>
                                    <span className="size">{ magent.size }</span>
                                    <CopyToClipboard text={ magent.dow } onCopy = { () => message.success("复制成功") }>
                                        <span className="btn">[复制链接]</span>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>
                    )
                })   
        }

        </div>

        </div>
        );
    }
}