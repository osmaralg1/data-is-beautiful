import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";

function MyChart(props) {
  const getTimeStamps = (timeSeries) => {
    return timeSeries.map(timeSerie => {
      return timeSerie.timeStamp
    })
  }

  const getTimeSeriesValue = (timeSeries) => {
    return timeSeries.map(timeSerie => {
      return timeSerie.value
    })
  }
  const getYAxis = (options) => {
    return options.yaxis
  }
  const getOptions = (timeSeries, options) => {
    return {
      colors: ['#8fa200'],
      chart: {
        id: "basic-bar",
        background: 'rgba(26,39,55,200)',
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: getTimeStamps(timeSeries)
      },
      yaxis: {
        min: 0,
        max: getYAxis(options),
      }
    }
  }

  const getSeries = (timeSeries) => {
    return [
      {
        name: "series-1",
        data: getTimeSeriesValue(timeSeries)
      }
    ]
  }
  const [chartConfig,
    setChartConfig] = useState({
    options: getOptions(props.timeSeries, props.options),
    series: getSeries(props.timeSeries)
  })

  const [timeSeries,
    setTimeSeries] = useState(props.timeSeries)

  const [options, setOptions] = useState(props.options)

  useEffect(() => {
    let mounted = true;

    setTimeSeries(() => {
      var newTimeSeries = props.timeSeries
      var newOptions = props.options
      var newChartConfig = {
        options: getOptions(newTimeSeries, newOptions),
        series: getSeries(newTimeSeries)
      }    
      setChartConfig(newChartConfig)
      return newTimeSeries
    })

    return () => {
      mounted = false;
    };

  }, [props.timeSeries]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartConfig.options}
            series={chartConfig.series}
            type="bar"
            width="100%"
            height="300" />
        </div>
      </div>
    </div>
  );
}

export default MyChart;