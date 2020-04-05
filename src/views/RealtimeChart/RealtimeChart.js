import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Chart from './Chart';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
const useStyles = makeStyles(styles);

/**
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
**/


function RealTime( props, { className, ...rest }) {
  console.log(props)
  const classes = useStyles();
  const [data, setData] = useState([
    0,
    1,
    6,
    36,
    216,
    1296,
  ]);

  const [labels, setLabels] = useState(data.map((value, i) => (i + 1) + ". Day"));
  const [index, setIndex] = useState(data.length);

  useEffect(() => {
    let mounted = true;

    setInterval(() => {


      setTimeout(() => {
        if (mounted) {



          setIndex((oldIndex) => {

            if (oldIndex < 42){
              setData((prevData) => {

                const newData = [...prevData];
                //const random = getRandomInt(100, 200);
                //newData[2] = newData[1]*5 + newData[1]
                const lastItem = newData[newData.length - 1] * 5 + newData[newData.length - 1]
                newData.shift()
                newData.push(lastItem)
                console.log(newData)

                return newData;
              });

              setLabels((label) => {
                const newLabel = [...label];
      
                newLabel.shift();
                newLabel.push((oldIndex + 1) + ". Day");
      
                return newLabel;
              });
            }

  
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
            <Chart
              data={data}
              labels={labels}
            />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{props.title}</h4>
              <p className={classes.cardCategory}>{labels[0]} {data[0]} </p>
            </CardBody>
    </div>

  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
