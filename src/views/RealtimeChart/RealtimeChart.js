import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';
import Chart from "./Chart.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
const useStyles = makeStyles(styles);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RealTime(props, {
  className,
  ...rest
}) {

  const classes = useStyles();
  const [timeSeries,
    setTimeSeries] = useState([
    {
      timeStamp: 1991,
      value: 30
    }, {
      timeStamp: 1992,
      value: 40
    }, {
      timeStamp: 1993,
      value: 45
    }, {
      timeStamp: 1994,
      value: 50
    }, {
      timeStamp: 1995,
      value: 51
    }, {
      timeStamp: 1996,
      value: 49
    }, {
      timeStamp: 1997,
      value: 60
    }, {
      timeStamp: 1998,
      value: 70
    }, {
      timeStamp: 1999,
      value: 91
    }
  ]);

  useEffect(() => {
    let mounted = true;

    setInterval(() => {
      setTimeout(() => {

        if (mounted) {
          setTimeSeries((oldSeries) => {
            const series = [...oldSeries]

            series.shift()
            series.push({
              timeStamp: series[series.length - 1].timeStamp + 1,
              value: getRandomInt(0, 100)
            })
            console.log(series)
            return series;
          })

        }
      }, 500);
    }, 500);

    return () => {
      mounted = false;
    };
  }, [timeSeries]);

  return (
    <div>
      <CardHeader color={props.color}>
        <Chart timeSeries={timeSeries}/>
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{props.title}</h4>
        <p className={classes.cardCategory}></p>
      </CardBody>
    </div>

  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
