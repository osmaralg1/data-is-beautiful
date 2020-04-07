import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';
import Chart from "./Chart.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
const useStyles = makeStyles(styles);


function RealTime(props, {
  className,
  ...rest
}) {

  const classes = useStyles();
  const [timeSeries,
    setTimeSeries] = useState([
    {
      timeStamp: 0,
      value: 0
    }, {
      timeStamp: 1,
      value: 1
    }
  ]);

  useEffect(() => {
    let mounted = true;

    setInterval(() => {
      setTimeout(() => {

        if (mounted) {
          setTimeSeries((oldSeries) => {
            const series = [...oldSeries]

            series.push({
              timeStamp: series[series.length - 1].timeStamp + 1,
              value: (series[series.length - 1].value - series[series.length - 2].value) * 5 + series[series.length - 1].value
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
