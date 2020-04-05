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
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {Helmet} from "react-helmet";

import CookieConsent from "react-cookie-consent";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import {configuration} from 'variables/configuration'

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Helmet>
          <title>{configuration.title}</title>
          <meta name="description" content={configuration.description} />
          <link rel="icon" type="image/png" href={configuration.favicon} sizes="16x16" />
          <link
              rel="apple-touch-icon"
              sizes="76x76"
              href={configuration.appleTouchIcon}
            />
      </Helmet>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
    <CookieConsent
        location="bottom"
        buttonText= {configuration.cookie.button}
        cookieName={configuration.cookie.name}
        style={configuration.cookie.style}
        buttonStyle={configuration.cookie.buttonStyle}
        expires={150}
      >
        {configuration.cookie.text}
      </CookieConsent>
  </Router>,
  document.getElementById("root")
);
