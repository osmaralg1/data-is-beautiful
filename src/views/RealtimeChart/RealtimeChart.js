import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';
import Chart from "./Chart.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AnimatedNumber from 'react-animated-number';
const useStyles = makeStyles(styles);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function RealTime(props, {
  className,
  ...rest
}) {

  const classes = useStyles();
  const [timeSeries,
    setTimeSeries] = useState([
    {
      timeStamp: 0,
      value: 0,

    }, {
      timeStamp: 1,
      value: 1,

    }
  ]);

  const [options, setOptions] = useState({
    yaxis: 10
  })

  useEffect(() => {
    let mounted = true;

    setInterval(() => {
      setTimeout(() => {

        if (mounted) { //*********************************************

          setTimeSeries((oldSeries) => {

            const series = [...oldSeries]
            const newPoint = (series[series.length - 1].value - series[series.length - 2].value) * 5 + series[series.length - 1].value

            if (series[series.length - 1].timeStamp > 12){
                series[series.length - 1] = {
                  timeStamp: series[series.length - 1].timeStamp,
                  value: 8e7
              }
              return series;

            }

              series.push({
                timeStamp: series[series.length - 1].timeStamp + 1,
                value: newPoint
              })

            return series;

          })

          
        } //*********************************************************
      }, 1000);
    }, 1000);

    return () => {
      mounted = false;
    };
  }, [timeSeries]);

  return (
    <div>
      <CardHeader color={props.color}>
        <Chart timeSeries={timeSeries} options={options} />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{props.title} Day {timeSeries[timeSeries.length - 1].timeStamp}</h4>
        <p className={classes.cardCategory}> <AnimatedNumber
                        style={{
                            transition: '0.8s ease-out',
                            transitionProperty:
                                'background-color, color'
                        }}
                        frameStyle={perc => (
                            perc === 100 ? {} : {backgroundColor: '#8fa200'}
                        )}
                        stepPrecision={0}
                        value={timeSeries[timeSeries.length - 1].value}
                        formatValue={n => `${numberWithCommas(n)} ` +
                            ''}/></p>
      </CardBody>
    </div>

  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
