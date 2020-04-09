import React, {useEffect, useRef}  from "react";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import {withLocalize, Translate } from "react-localize-redux";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import RealtimeChart from "views/RealtimeChart/RealtimeChart.js";

import {usePrevious} from "utils/misc";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


function Dashboard(props) {
  const addTranslationsForActiveLanguage = () => {
    const {activeLanguage} = props;

    if (!activeLanguage) {
      return;
    }
    
    import(`../../variables/translations/${activeLanguage.code}.dashboard.json`) 
      .then(translations => {
        props.addTranslationForLanguage(translations, activeLanguage.code)
      });
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


  const classes = useStyles();
  return (
    <div>
      <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
          <Card chart>
              <RealtimeChart bar_color='#1a97cc' height="300" function="infection" color={"info"} title={<Translate id={`infected`}></Translate>} />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`infectionrate`} />
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart bar_color='#037902' height="200" function="symptoms" color={"success"} title={<Translate id={`symptomatic`}></Translate>} />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`symptom`} />
                
              </div>
            </CardFooter>
          </Card>
        </GridItem>
       
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>

            <RealtimeChart bar_color='#c2d232' height="200" function="ill" color={"warning"} title={<Translate id={`seriouslyill`}></Translate>} />

            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`serious`} />
                
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>

            <RealtimeChart bar_color='#ec4c49' height="200" function="deads" color={"danger"} title={<Translate id={`livelost`}></Translate>} />

            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`death`} />
              </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}

export default withLocalize(Dashboard);