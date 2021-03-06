// @flow
import React from 'react';
import {withLocalize, Translate} from 'react-localize-redux';
import {Link} from "react-router-dom";
// @material-ui/icons
import {Apps} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Localize from "components/Localize/Localize.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import countries from "assets/misc/countries.json";
import { getData } from "variables/simulation/simulationRealData";

import { setGlobal, useGlobal } from 'reactn';

var Enumerable = require('linq');

const useStyles = makeStyles(styles);

function CountryDropDown(props) {

    const sortedCountries = Enumerable
        .from(countries)
        .orderBy("$.country")
        .toArray()

    const classes = useStyles();

    const getTranslations = (activeLanguageCode) => {

        if (activeLanguageCode === null || activeLanguageCode === undefined) {
            return;
        }

        // return import
        // (`../../assets/translations/countries/${activeLanguageCode}.json`)
        return import (`../../assets/translations/countries/en.json`)
    }

    const setSelectedCountry = (country) => {
        setGlobal({
            country: country.country,
            data: getData(country.country)
          });
        if (props.onCountryChanged !== null && props.onCountryChanged !== undefined) {
            props.onCountryChanged(country.country)
        }
    }

    return ([ < Localize getTranslations = {
            getTranslations
        } />, < CustomDropdown  noLiPadding buttonText = { useGlobal("country")
        }
        buttonProps = {{
            className: classes.navLink,
            color: "transparent",
            style:{fontSize: 20}
          }}
        buttonIcon = {
            Apps
        }
        dropdownList = {
            sortedCountries.map(country => {

                return <Link
                    onClick={() => {
                    setSelectedCountry(country)
                }}
                    className={classes.dropdownLink}
                    key={country.country}>
                    {/* <Translate id={"country." + country + ".name"}/> */}
                    {country.country}
                </Link>
            })
        } />
    ]);
};

export default withLocalize(CountryDropDown);