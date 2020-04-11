import React from "react";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import {Translate} from "react-localize-redux";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import Localize from "components/Localize/Localize.js";
import RealtimeChart from "views/RealtimeChart/RealtimeChart.js";
import Parameter from "views/Parameter/Parameter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const getTranslations = (activeLanguageCode) => {

    if (activeLanguageCode === null || activeLanguageCode === undefined) {
      return;
    }

    return import (`../../variables/translations/Dashboard/${activeLanguageCode}.json`)
  }

  const classes = useStyles();
  return (
    <div>
      <Localize getTranslations={getTranslations}/>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <Card chart>
              <RealtimeChart bar_color='#1a97cc' height="300" function="infection" color={"info"}
               timestampTitle={<Translate id={`day`}></Translate>} title={<Translate id={`infected`}></Translate>} />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`infectionrate`}/>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart bar_color='#037902' height="200" function="symptoms" color={"success"}
             timestampTitle={<Translate id={`day`}></Translate>} title={<Translate id={`symptomatic`}></Translate>} />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`symptom`}/>

              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart bar_color='#c2d232' height="200" function="ill" color={"warning"}
             timestampTitle={<Translate id={`day`}></Translate>} title={<Translate id={`seriouslyill`}></Translate>} />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`serious`}/>

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart bar_color='#ec4c49' height="200" function="deads" color={"danger"}
             timestampTitle={<Translate id={`day`}></Translate>} title={<Translate id={`livelost`}></Translate>} />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`death`}/>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}

export default Dashboard;