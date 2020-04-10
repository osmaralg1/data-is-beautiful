import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';
import Chart from "./Chart.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AnimatedNumber from 'react-animated-number';
import { numberWithCommas } from './utils.js';

import { infection, symptoms, random, ill, deads } from './simulation.js';


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
            'deads': deads,
        };
  const classes = useStyles();
  const [timeSeries,
    setTimeSeries] = useState([
    {
      timeStamp: 0,
      value: 0,

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
            
            const method = funcMap[props.function];

            if (typeof method === 'function') {
              return method([...oldSeries])
            }
            else{
              return [...oldSeries]
            }
            

          })

          
        } //*********************************************************
      }, 2000);
    }, 2000);

    return () => {
      mounted = false;
    };
  }, [timeSeries]);

  return (
    <div>
      <CardHeader color={props.color}>
        <Chart bar_color={props.bar_color} timeSeries={timeSeries} options={options} height={props.height} />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{props.title}</h4>
        <p className={classes.cardCategory} style={{fontSize: 25}}> 
        {props.timestampTitle} {" "} {timeSeries[timeSeries.length - 1].timeStamp} {":  "} 
        <AnimatedNumber
                        style={{
                            transition: '0.8s ease-out',
                            transitionProperty:
                                'background-color, color'

                        }}
                        // frameStyle={perc => (
                        //     perc === 100 ? {} : {backgroundColor: props.bar_color}
                        // )}
                        stepPrecision={0}
                        value={timeSeries[timeSeries.length - 1].value}
                        formatValue={n => `${numberWithCommas(n)} ` +
                            ''}/>

        </p>
      </CardBody>
    </div>

  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
