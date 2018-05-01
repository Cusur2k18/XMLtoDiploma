import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <App />
  </MuiThemeProvider>, 
  document.getElementById('root'));
registerServiceWorker();
