import React from "react";
import {Link} from "react-router-dom";
import QRCode from 'qrcode.react';

export default() => (
  <div className='App'>
    <header className='App-header'>
      <img src='https://images.unsplash.com/photo-1514483127413-f72f273478c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        className='App-logo' alt='logo' width='600px' height = '600px'/>
      <div className='qrcode'>
        <QRCode
          id='qrcode'
          value='https://viblo.asia/u/hieudinh'
          size={290}
          level={'L'}
          includeMargin={true}
        />
      </div>
    </header>
  </div>
)
