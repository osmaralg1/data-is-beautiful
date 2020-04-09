// @flow
import React, {useEffect} from 'react';
import { withLocalize, Translate } from 'react-localize-redux';
import { Link } from "react-router-dom";
// @material-ui/icons
import { Apps } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import {usePrevious} from "utils/misc";
import translations from "assets/translations/languages.json"
const useStyles = makeStyles(styles);

function LanguageToggle(props) {

  const classes = useStyles();

  const addTranslationsForActiveLanguage = () => {
    const {activeLanguage} = props;

    console.log()

    if (!activeLanguage) {
      return
    }
    
    props.addTranslationForLanguage(translations, activeLanguage.code)
  }

  addTranslationsForActiveLanguage();

  const prevProps = usePrevious(props)
  
  useEffect(() => {
    let hasActiveLanguageChanged = true
    if (prevProps !== null && prevProps !== undefined)
      hasActiveLanguageChanged = prevProps.activeLanguage !== props.activeLanguage;

    if (hasActiveLanguageChanged) {
      addTranslationsForActiveLanguage();
    }
  })

  return (
    <CustomDropdown
          noLiPadding
          buttonText={<Translate id={props.activeLanguage !== null && props.activeLanguage !== undefined ? props.activeLanguage.code : "en"} />}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={props.languages.map(lang => 

            <Link onClick={() => {
              props.setActiveLanguage(lang.code)}} className={classes.dropdownLink} key={ lang.code }  >
              { lang.name }
            </Link>
          )}
        />
  );
};

export default withLocalize(LanguageToggle);