import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { Spin, Space } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'

import './index.scss'
import axios from 'axios';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [results, setResults] = React.useState([])
  const [subtitle, setSubtitle] = React.useState([])
  const [spinning, setSpinning] = React.useState(true)
  const [spinningmid, setSpinningmid] = React.useState(true)
  const [isShow, setisShow] = React.useState([true,false,false,false,false,false,false])
  const { imgSrc, name, id } = props

  const handleClickOpen = (id) => {
    setOpen(true)
    setSpinning(true)
    setSpinningmid(true)
    axios.get('http://localhost:3001/api/moreinfo',{ params: {
      id
    } })
    .then(function (response) {
      setResults(response.data)
      setSpinningmid(false)
    })
    .catch(function (err) {
      console.log(err)
    })
    axios.get('http://localhost:3001/api/subtitle', { params: {
      id
    } })
    .then(function (response) {
      setSubtitle(response.data)
      setSpinning(false)
    })
    .catch(function (err) {
      console.log(err)
    })

    // setSpinning(false)
    console.log("2")
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const setShow = (number) => {
    let show = [false,false,false,false,false,false,false]
    show[number] = true
    setisShow(show)
  } 

  return (
    <div>
      <div style={{ display:"flex",height: "260px",width: "215px",justifyContent:"center" }} onClick={() => handleClickOpen(id)}>
        <img src={ imgSrc } />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={false}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          { name }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="content">

                 
                    <div className="right">
                      <Spin size="small" spinning={spinning}>
                      {
                        subtitle.map((left,index) => {
                          return(
                            <div className={ `name${index}` } onClick={() => setShow(index)}>
                              <button className={isShow[index] === true ? "custom-btn btn-6 isactive":"custom-btn btn-6"}>
                                <span>{left}</span>
                              </button>
                            </div>
                          )
                        })
                      }
                        </Spin>
                      </div>
                  

                  
                  <div className="mid">
                  <Spin size="large" spinning={spinningmid}>
                    {
                      results.map((mid,index) => {
                        return(
                          <div style={isShow[index] === true ? {display:'block'}:{display:'none'}}>
                            <div className="container">
                              
                              {
                                mid.map((info) => {
                                  if(info.name !== '查看更多'){
                                    return(
                                      <div className="items">
                                        <div>
                                          <span>{ info.name }</span>
                                          <CopyToClipboard text={ info.magent } onCopy = { () => message.success("复制成功") }>
                                            <span className="btn">[复制链接]</span>
                                          </CopyToClipboard>
                                        </div>
                                        <p>
                                          { info.time }
                                        </p>
                                      </div>
                                    )
                                  }else{
                                    return(
                                      <div className="more">
                                        <span>查看更多</span>
                                      </div>
                                    )
                                  }
                                })
                              }

                            </div>
                          </div>
                        )
                      })
                    }
                    </Spin>
                  </div>
                  
                

                <div className="left">
                  <img src={ imgSrc } />
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            关 闭
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}