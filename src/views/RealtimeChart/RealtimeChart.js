import React, { useState, useEffect } from 'react';

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



function RealTime( props, { className, ...rest }) {

  const classes = useStyles();
  const [data, setData] = useState([0,1,2]);


  const [options, setOptions] = useState({
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      })
  const [series, setSeries] = useState([{
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
          }]
        )


  const [index, setIndex] = useState(data.length);

  useEffect(() => {
    let mounted = true;

    setInterval(() => {
      setTimeout(() => {

        if (mounted) {



          setIndex((oldIndex) => {

            setSeries((oldSeries) => {
              const series =  [...oldSeries]
              //console.log(series)
              series[0].data.shift()
              series[0].data.push(getRandomInt(0, 100))
              return series;
            })

            setOptions((oldOptions) => {
              const options = {...oldOptions}
              options.xaxis.categories.shift()
              options.xaxis.categories.push(options.xaxis.categories[options.xaxis.categories.length - 1] + 1)
              return options
            })

  
            return oldIndex + 1
          });
        }
      }, 500);
    }, 500);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
          <CardHeader color={props.color}>
            <Chart  />
            </CardHeader>

    </div>

  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
