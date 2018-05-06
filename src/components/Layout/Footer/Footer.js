import React from 'react';

import './Footer.css';

export default () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="col align-self-start"></div>
        <div className="col align-self-center text-center">
          <p>Centro Universitario Del Sur &reg;</p>
        </div>
        <div className="col align-self-end text-right">
          <ul>
            <li>
              <a href="https://github.com/CrystalStream" target="_blank" rel="noopener noreferrer" >
                <i className="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
