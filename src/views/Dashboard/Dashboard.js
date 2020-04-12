import React from "react";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";

// @material-ui/icons
import Event from "@material-ui/icons/BugReport";

import {Translate} from "react-localize-redux";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import Localize from "components/Localize/Localize.js";
import RealtimeChart from "views/RealtimeChart/RealtimeChart.js";
import Parameter from "views/Parameter/Parameter.js";

import {withLocalize} from "react-localize-redux";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Table from 'views/Table/Table'
const useStyles = makeStyles(styles);

function formatDateOnlyDate(dateString) {
  if (dateString === null || dateString === undefined) 
      return null
  var d = new Date(dateString);
  var date = addZero(d.getDate(), 2);
  var month = addZero(d.getMonth() + 1, 2);

  var year = d.getFullYear()
  return date + "-" + month + "-" + year
  // + ":" + ms;
}

function addZero(x, n) {
  while (x.toString().length < n) {
      x = "0" + x;
  }
  return x;
}

function Dashboard(props) {
  const [country,
    setCountry] = React.useState("Germany");
  const [restart,
    setRestart] = React.useState(false);
  const [pause,
    setPause] = React.useState(false);
  const [start,
    setStart] = React.useState(false);
  const getTranslations = (activeLanguageCode) => {

    if (activeLanguageCode === null || activeLanguageCode === undefined) {
      return;
    }

    return import (`../../variables/translations/Dashboard/${activeLanguageCode}.json`)
  }

  const setSelectedCountry = (country) => {
    if (props.onSelectedCountry !== null && props.onSelectedCountry !== undefined) 
      props.onSelectedCountry(country)
    setCountry(country.country)
  }

  const onRestart = () => {
    setRestart(oldRestart => !oldRestart)
  }
  const onPause = () => {
    setPause(oldPause => !oldPause)
  }

  const onStart = () => {
    setStart(oldPause => !oldPause)
  }

  const classes = useStyles();
  return (
    <div>
      <Localize getTranslations={getTranslations}/>
      <GridContainer>

        <GridItem xs={12} sm={6} md={6}>
          <Parameter
            onSelectedCountry={(country) => {
            setSelectedCountry(country)
          }}
            onRestart={() => onRestart()}
            onPause={() => onPause()}
            onStart={() => onStart()}></Parameter>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card chart>
            <RealtimeChart
              start={start}
              restart={restart}
              pause={pause}
              country={country}
              bar_color='#1a97cc'
              height="300"
              function="infection"
              color={"info"}
              timestampTitle={props.translate("day")}
              title={< Translate id = {
              "infected"
            } > </Translate>}/>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={"infectionrate"}/>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart
              start={start}
              pause={pause}
              restart={restart}
              country={country}
              bar_color='#037902'
              height="200"
              function="symptoms"
              color={"success"}
              timestampTitle={< Translate id = {
              `day`
            } > </Translate>}
              title={< Translate id = {
              `symptomatic`
            } > </Translate>}/>
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
            <RealtimeChart
              start={start}
              pause={pause}
              restart={restart}
              country={country}
              bar_color='#c2d232'
              height="200"
              function="ill"
              color={"warning"}
              timestampTitle={< Translate id = {
              `day`
            } > </Translate>}
              title={< Translate id = {
              `seriouslyill`
            } > </Translate>}/>
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
            <RealtimeChart
              start={start}
              pause={pause}
              restart={restart}
              country={country}
              bar_color='#ec4c49'
              height="200"
              function="deads"
              color={"danger"}
              timestampTitle={< Translate id = {
              `day`
            } > </Translate>}
              title={< Translate id = {
              `livelost`
            } > </Translate>}/>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                <Translate id={`death`}/>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>

          <Table doNotFetch={true}
           country={country}
          title="Report"
        address={"corona-report"}
        filter={{languageId: 1}}
  
        
        columns={[
          {
            id: 1,
            title: "Date",
            name: ["lastUpdate"],
            format: formatDateOnlyDate
          }, 
          {
            id: 2,
            title: "Confirmed - Daily",
            name: ["deltaConfirmed"]
          },

          {
            id: 3,
            title: "Confirmed - Cummulative",
            name: ["confirmed"]
          },
          {
            id: 2,
            title: "Deaths",
            name: ["deaths"]
          }

        
      ]}
        icon={<Event/>}
        color={"danger"}>
  
      ></Table>

        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withLocalize(Dashboard);