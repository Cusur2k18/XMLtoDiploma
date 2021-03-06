import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <Layout>
        <div className="shadowed-navbar">
          <Home />
        </div>
      </Layout>
    );
  }
}

export default App;
