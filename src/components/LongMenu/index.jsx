import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './index.scss'

export default function LongMenu(props) {
  const { getpage } = props
  let pages = []
  for(let i = 1;i <= Number.parseInt(props.count) - 1;i++) {
    pages = [...pages, i]
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (page) => {
    console.log(page)
    setAnchorEl(null)
  }

  return (
    <div>
      <button className="leftButton" onClick={handleClick}>{props.pageNumber}/{props.count - 1}页</button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "500px",
            width: '20ch',
          },
        }}
      >
        {
          pages.map((page) => (
            <MenuItem key={page} selected={page === props.pageNumber} onClick={() => { getpage(page);setAnchorEl(null) }}>
              {page}/{props.count - 1}页
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}