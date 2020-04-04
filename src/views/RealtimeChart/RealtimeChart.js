import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Chart from './Chart';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RealTime({ className, ...rest }) {

  const [data, setData] = useState([
    163,
    166,
    161,
    159,
    99,
    163,
    173,
    166,
    167,
    183,
    176,
    172
  ]);

  const [labels, setLabels] = useState(data.map((value, i) => (i + 1) + ". Day"));
  
  const [index, setIndex] = useState(data.length);

  useEffect(() => {
    let mounted = true;

    setInterval(() => {


      setTimeout(() => {
        if (mounted) {
          setData((prevData) => {
            const newData = [...prevData];
            const random = getRandomInt(100, 200);
            newData.shift()
            newData.push(random);

            return newData;
          });

          setIndex((oldIndex) => {

            setLabels((label) => {
              const newLabel = [...label];
    
              newLabel.shift();
              newLabel.push((oldIndex + 1) + ". Day");
    
              return newLabel;
            });
  
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
        <Chart
          data={data}
          labels={labels}
        />
  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
