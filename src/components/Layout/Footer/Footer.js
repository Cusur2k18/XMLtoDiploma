import React from 'react';

import './Footer.css';

export default () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="col align-self-start">
          <ul className="footer-description">
            <li>CENTRO UNIVERSITARIO DEL SUR</li>
            <li>Av. Enrique Arreola Silva No. 883, colonia centro</li>
            <li>C.P. 49000, Ciudad Guzmán, Jalisco, México.</li>
            <li>Teléfono: +52 (341) 575 2222, Fax: 01 (341) 5752223.</li>
          </ul>
        </div>
        <div className="col align-self-end text-right d-none d-md-block">
          <ul >
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
