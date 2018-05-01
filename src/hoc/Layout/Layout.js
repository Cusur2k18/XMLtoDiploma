import React, { Component } from 'react'

import Aux from '../Aux/Aux';
import Navbar from '../../components/Layout/Navbar/Navbar';

export default class Layout extends Component {
  render() {
    return (
      <Aux>
        <Navbar title="App" />
        {this.props.children}
      </Aux>
    )
  }
}
