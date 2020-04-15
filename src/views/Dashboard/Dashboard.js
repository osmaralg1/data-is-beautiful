import React, {useState} from "react";
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
import Statistic from "views/Statistic/Statistic.js";

import {withLocalize} from "react-localize-redux";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Table from 'views/Table/Table';
import Realtime from 'views/RealtimeChart/TimeSeries.js';
import {formatDateOnlyDate} from "utils/date";


const useStyles = makeStyles(styles);

function Dashboard(props) {

  const getTranslations = (activeLanguageCode) => {

    if (activeLanguageCode === null || activeLanguageCode === undefined) {
      return;
    }

    return import (`../../variables/translations/Dashboard/${activeLanguageCode}.json`)
  }

  const [data,
    setData] = useState(null);


  const onTick = (newData) => {
    if (newData === null || newData === undefined)
      return
    setData(newData)
  }

  const [restart,
    setRestart] = useState(false);


  const classes = useStyles();
  return (
    <div>
    <GridContainer>

    
      <GridItem xs={12} sm={6} md={6}>

        <Parameter onTick={onTick} restart={() => {
          setRestart(oldRestart => !oldRestart)}
          }></Parameter>
        <Statistic data={data} restart={restart}></Statistic>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Realtime data={data} function="infection" 
              bar_color='#1a97cc'
              height="250"
              color={"info"}
              restart={restart}
              timestampTitle={props.translate("day")}
              title={props.translate("infected")}></Realtime>
      </GridItem> 
      <GridItem xs={12} sm={12} md={4}>
        <Realtime data={data} function="symptoms" bar_color='#037902'
          restart={restart}
              height="200"
              color={"success"}
              timestampTitle={< Translate id = {
              `day`
            } > </Translate>}
              title={< Translate id = {
              `symptomatic`
            } > </Translate>}></Realtime>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Realtime data={data} function="ill" bar_color='#c2d232'
              height="200"
              restart={restart}
              color={"warning"}
              timestampTitle={< Translate id = {
              `day`
            } > </Translate>}
              title={< Translate id = {
              `seriouslyill`
            } > </Translate>} ></Realtime>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Realtime data={data} function="deads" bar_color='#ec4c49'
              height="200"
              restart={restart}
              color={"danger"}
              timestampTitle={< Translate id = {
              `day`
            } > </Translate>}
              title={< Translate id = {
              `livelost`
            } > </Translate>}></Realtime>
      </GridItem> 
             
              {/* <GridItem xs={12} sm={12} md={12}>

          <Table
            doNotFetch={true}
            title="Report"
            address={"corona-report"}
            filter={{
            languageId: 1
          }}
            columns={[
            {
              id: 1,
              title: "Date",
              name: ["lastUpdate"],
              format: formatDateOnlyDate
            }, {
              id: 2,
              title: "Confirmed - Daily",
              name: ["deltaConfirmed"]
            }, {
              id: 3,
              title: "Confirmed - Cummulative",
              name: ["confirmed"]
            }, {
              id: 2,
              title: "Deaths",
              name: ["deaths"]
            }
          ]}
            icon={< Event />}
            color={"danger"}>

            ></Table>

        </GridItem> 

{/* 
        <GridItem xs={12} sm={6} md={6}>
          <Card chart>
            <RealtimeChart
              data={data}
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
              data={data}
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
            data={data}
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
            data={data}
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
         */}
        <Localize getTranslations={getTranslations}/>
      </GridContainer>
      

    </div>
  )
}

export default withLocalize(Dashboard)