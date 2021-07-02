import React, { Component } from 'react';
import Script from 'react-load-script'

import './index.scss'

export default class index extends Component {
    render() {
        return (
            <div className="Swiper-container">
                <div id="drag-container">
                <div id="spin-container">
                    <img src="https://z3.ax1x.com/2021/06/07/2dvJCn.png" alt="" />
                    <img src="https://z3.ax1x.com/2021/06/07/2dvr59.png" alt="" />
                    <img src="https://z3.ax1x.com/2021/06/07/2dvfbD.png" alt="" />
                    <img src="https://z3.ax1x.com/2021/06/07/2dv78I.png" alt="" />
                    <img src="https://z3.ax1x.com/2021/06/07/2dxC2q.png" alt="" />
                    <img src="https://z3.ax1x.com/2021/06/07/2dxZa4.png" alt="" />
                    
                    <a target="_blank" href="https://z3.ax1x.com/2021/06/07/2dxZa4.png">
                        <img src="https://z3.ax1x.com/2021/06/07/2dxZa4.png" alt="" />
                    </a>

                    <p></p>
                </div>
                <div id="ground"></div>
                </div>

                <Script url="http://81.71.103.97/swiper/swiper.js"></Script>
            </div>
        )
    }
}
