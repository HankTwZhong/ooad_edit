import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter as Router,Route} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
, document.getElementById('root'));

registerServiceWorker();