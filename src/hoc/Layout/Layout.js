import React, { Component } from 'react'

import Aux from '../Aux/Aux';
import Footer from '../../components/Layout/Footer/Footer';
import Navbar from '../../components/Layout/Navbar/Navbar';

export default class Layout extends Component {
  render() {
    return (
      <Aux>
        <Navbar cssClass="app-navbar"/>
        {this.props.children}
        <Footer />
      </Aux>
    )
  }
}
