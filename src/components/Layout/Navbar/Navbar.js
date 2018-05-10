import React from 'react'

import './Navbar.css';
import headerImg from '../../../assets/header.png';

export default (props) => {
  return (
    <div className={props.cssClass}>
      <img src={headerImg} className="img-fluid" alt="header" width="300" />
    </div>
  )
}
