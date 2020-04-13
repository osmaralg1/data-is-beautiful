/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LocalizeProvider, localizeReducer } from 'react-localize-redux';
import { setGlobal } from 'reactn';

import "assets/css/material-dashboard-react.css?v=1.8.0";
import {configuration} from 'variables/configuration'

import App from 'components/App/App'


setGlobal({
  configuration: configuration
});

const getReduxStore = () => {
  return createStore(combineReducers({ 
    localize: localizeReducer
  }), composeWithDevTools());
}

const store =  getReduxStore();

ReactDOM.render(
  <LocalizeProvider store={store}>
    <App/>
  </LocalizeProvider>,
  document.getElementById("root")
);
