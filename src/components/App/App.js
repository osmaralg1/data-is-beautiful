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
import React, {useState} from "react";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {Helmet} from "react-helmet";

import CookieConsent from "react-cookie-consent";
import {renderToStaticMarkup} from "react-dom/server";
import {withLocalize} from "react-localize-redux";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import "assets/css/material-dashboard-react.css?v=1.8.0";

import Localize from "components/Localize/Localize.js";

import {configuration} from 'variables/configuration'

const hist = createBrowserHistory();

class App extends React.Component {

    constructor(props) {
        super(props);

        this
            .props
            .initialize({languages: configuration.languages, translation: configuration.globalTranslations, options: {
                    renderToStaticMarkup
                }});
    }

    getTranslations = (activeLanguageCode) => {

        if (activeLanguageCode === null || activeLanguageCode === undefined) {
            return;
        }

        return import ("../../variables/translations/Configuration/" + activeLanguageCode + ".json")
    }

    render() {

        return (
            <Router history={hist}>
                <Localize getTranslations={this.getTranslations}/>
                <Helmet>
                    <title>{this
                            .props
                            .translate("title")}</title>
                    <meta
                        name="description"
                        content={this
                        .props
                        .translate("description")}/>
                    <link rel="icon" type="image/png" href={configuration.favicon} sizes="16x16"/>
                    <link rel="apple-touch-icon" sizes="76x76" href={configuration.appleTouchIcon}/>
                </Helmet>

                <div style={{
                    marginLeft: 400
                }}></div>

                <Switch>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/rtl" component={RTL}/>
                    <Redirect from="/" to="/admin/dashboard"/>
                </Switch>
                <CookieConsent
                    location="bottom"
                    buttonText={this
                    .props
                    .translate("cookie.button")}
                    cookieName={configuration.cookie.name}
                    style={configuration.cookie.style}
                    buttonStyle={configuration.cookie.buttonStyle}
                    expires={150}
                    declineButtonText={this
                        .props
                        .translate("cookie.declineButton")}
                    enableDeclineButton
                    declineButtonStyle={configuration.cookie.buttonStyle}
                    declineCookieValue={false}
                    setDeclineCookie={false}
                    debug={true}
                    onDecline={() => {
                        window.open(configuration.privacy)
                    }}>
                    {this
                        .props
                        .translate("cookie.text")}

                </CookieConsent>
            </Router>
        )
    }
}

export default withLocalize(App);