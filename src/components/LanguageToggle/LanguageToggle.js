// @flow
import React from 'react';
import {withLocalize, Translate } from 'react-localize-redux';
import { Link } from "react-router-dom";
// @material-ui/icons
import { Apps } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Localize from "components/Localize/Localize.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function LanguageToggle(props) {

  const classes = useStyles();

  const getTranslations = () => {
    return import("../../assets/translations/languages.json")
  }

  return (
    [<Localize getTranslations={getTranslations}/>,
    <CustomDropdown
          noLiPadding
          buttonText={<Translate id={props.activeLanguage !== null && props.activeLanguage !== undefined ? props.activeLanguage.code + ".language" : "en.language"} />}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            textColor: props.whiteColor === true ? "white" : null
          }}
          buttonIcon={Apps}
          dropdownList={props.languages.map(lang => 

            <Link onClick={() => {
              props.setActiveLanguage(lang.code)}} className={classes.dropdownLink} key={ lang.code }  >
              <Translate id={lang.code + ".name"} />
            </Link>
          )}
        /> ]
  );
};

export default withLocalize(LanguageToggle);