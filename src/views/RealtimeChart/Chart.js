import React from 'react';
import PropTypes from 'prop-types';

import ChartistGraph from "react-chartist";

function Chart(props) {

  const data = {
    labels: props.labels,
    series: [props.data]
  }

  const options = {
    high: 1000,
    low: -10,
  }

  return (
    <div>
      <ChartistGraph className="ct-chart" data={data} type="Line" />
    </div>
  );
}

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default Chart;
