import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import RealtimeChart from "views/RealtimeChart/RealtimeChart.js";


import {dailySalesChart, emailsSubscriptionChart, completedTasksChart} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
          <Card chart>
              <RealtimeChart bar_color='#1a97cc' height="300" function="infection" color={"info"} title="Infected People" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                Infection rate: 1 person will infect in average 5 other persons.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart bar_color='#037902' height="200" function="syntoms" color={"success"} title="People with syntoms" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                20 % of infected people will show syntoms
              </div>
            </CardFooter>
          </Card>
        </GridItem>
       
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart bar_color='#c2d232' height="200" function="syntoms" color={"warning"} title="People seriously ill" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                6 % of syntomatic people will become seriously ill
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart bar_color='#ec4c49' height="200" function="syntoms" color={"danger"} title="Lost lives" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                50 % of seriously ill will pass away
              </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
