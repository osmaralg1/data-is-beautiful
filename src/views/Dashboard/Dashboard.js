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
import Chart from "views/RealtimeChart/Chart.js";


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
              <Chart title="Infected People" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                Random Number set every 500 milliseconds
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      {/** 
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart color={"success"} title="People with syntoms" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart color={"warning"} title="People seriously ill" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <RealtimeChart color={"danger"} title="Lost lives" />
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime/>
                campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        **/}
      </GridContainer>
    </div>
  );
}
