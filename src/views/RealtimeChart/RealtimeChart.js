import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';
import Chart from "./Chart.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AnimatedNumber from 'react-animated-number';

import {usePrevious, numberWithCommas} from "utils/misc";

import {infection, symptoms, random, ill, deads, formatDateOnlyDate} from 'variables/simulation/simulationRealData.js';
import { useGlobal } from 'reactn';

const useStyles = makeStyles(styles);

function RealTime(props, {
  className,
  ...rest
}) {
  const funcMap = {
    'infection': infection,
    'symptoms': symptoms,
    'random': random,
    'ill': ill,
    'deads': deads
  };
  const classes = useStyles();
  const [timeSeries,
    setTimeSeries] = useState([
  ]);
  const [data,
    setData] = useGlobal('data');

  const options = {yaxis: 10}



  const prevProps = usePrevious(props)
  useEffect(() => {


    if (prevProps !== null && prevProps !== undefined && prevProps.index !== props.index) {
      setTimeSeries((oldSeries) => {

        if (props.index === 0) {
          oldSeries = []
        }

        const method = funcMap[props.function];
        if (typeof method === 'function') {
          const result = method(data, [...oldSeries], props.country)
          return result.series
        } else {
          return [...oldSeries]
        }
      })
    }

  }, [props.index]);
 
  return (
    <div>
      <CardHeader color={props.color}>
        <Chart
          bar_color={props.bar_color}
          timeSeries={timeSeries}
          options={options}
          height={props.height}/>
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{props.title}</h4>
        <p className={classes.cardCategory} style={{
          fontSize: 20
        }}>
          {props.timestampTitle}
          {" "}
          {timeSeries.length > 0 ? formatDateOnlyDate(timeSeries[timeSeries.length - 1].timeStamp)  : ""}
          {":  "}
          <AnimatedNumber style={{
            transition: '0.8s ease-out',
            transitionProperty: 'background-color, color',
            fontSize: 25,
            fontWeight: 600
          }} // frameStyle={perc => (} //     perc === 100 ? {} : {backgroundColor: props.bar_color}
            // )}
            stepPrecision={0} value={timeSeries.length > 0 ? timeSeries[timeSeries.length - 1].value : ""} formatValue={n => `${numberWithCommas(n)} `}/>

        </p>
      </CardBody>
    </div>

  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
