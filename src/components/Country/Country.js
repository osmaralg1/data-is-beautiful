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
var Enumerable = require('linq');
const sortedCountries = Enumerable.from(countries).orderBy("$.country").toArray()
const useStyles = makeStyles(styles);

function CountryDropDown(props) {

    const classes = useStyles();

    const getTranslations = (activeLanguageCode) => {

        if (activeLanguageCode === null || activeLanguageCode === undefined) {
            return;
        }

        return import (`../../assets/translations/countries/${activeLanguageCode}.json`)
    }

    const setSelectedCountry = (country) => {
        if (props.onSelectedCountry !== null && props.onSelectedCountry !== undefined)
            props.onSelectedCountry(country)
    }


    return ([ < Localize getTranslations = {
            getTranslations
        } />, < CustomDropdown noLiPadding buttonText = { < Translate id = {
                props.activeLanguage !== null && props.activeLanguage !== undefined
                    ? "chooseCountry"
                    : "en.language"
            } />
        }
        buttonProps = {{
            className: classes.navLink,
            color: "transparent",
            textColor: props.whiteColor === true ? "white" : null
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