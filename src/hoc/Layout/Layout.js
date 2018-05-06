import React, { Component } from 'react'

import Aux from '../Aux/Aux';
import Footer from '../../components/Layout/Footer/Footer';

export default class Layout extends Component {
  render() {
    return (
      <Aux>
        {this.props.children}
        <Footer />
      </Aux>
    )
  }
}
