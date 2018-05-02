import React, { Component } from 'react'

import Aux from '../Aux/Aux';
import Navbar from '../../components/Layout/Navbar/Navbar';

export default class Layout extends Component {
  render() {
    return (
      <Aux>
        <Navbar cssClass="container-fluid app-navbar text-center"/>
        {this.props.children}
      </Aux>
    )
  }
}
