import React from 'react';

import PropTypes from 'prop-types';
import Chart from "./Chart.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AnimatedNumber from 'react-animated-number';

import {numberWithCommas} from "utils/misc";
import {formatDateOnlyDate} from "utils/date";
import Realtime from 'views/RealtimeChart/TimeSeries.js';
import {funcMap } from "variables/simulation/simulationRealData";
import 'assets/css/cardHeader.css'; // Tell webpack that Button.js uses these styles

const useStyles = makeStyles(styles);

function RealTime(props, {
  className,
  ...rest
}) {

  const options = {
    yaxis: 10
  }

  const classes = useStyles();

  return (
    <div>
      <CardHeader color={props.color} style={{backgroundColor: "#1a2737"}} className="cardHeader">
      <Realtime data={props.data} function={props.function} bar_color={props.bar_color}></Realtime>
        {/**
        <Chart
          method={funcMap[props.function]}
          bar_color={props.bar_color}
          data={props.data}
          options={options}
          height={props.height}/>
        **/}
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{props.title}</h4>
        <p className={classes.cardCategory} style={{
          fontSize: 20
        }}>

          {props.timestampTitle}
          {" "}
          {props.data !== null && props.data !== undefined
            ? "" //formatDateOnlyDate(props.data.lastUpdate)
            : ""}
          {"" /*":  "*/}
          <AnimatedNumber
            style={{
            transition: '0.8s ease-out',
            transitionProperty: 'background-color, color',
            fontSize: 25,
            fontWeight: 600
          }}
            stepPrecision={0}
            value={props.data !== null && props.data !== undefined
            ? funcMap[props.function](props.data)
            : ""}
            formatValue={n => `${numberWithCommas(n)} `}/>

        </p>
      </CardBody>
    </div>

  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
