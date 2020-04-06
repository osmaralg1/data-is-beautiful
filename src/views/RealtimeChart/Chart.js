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
  const getOptions = (timeSeries) => {
    return {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: getTimeStamps(timeSeries)
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
    options: getOptions(props.timeSeries),
    series: getSeries(props.timeSeries)
  })

  const [timeSeries,
    setTimeSeries] = useState(props.timeSeries)

  useEffect(() => {
    let mounted = true;

    setTimeSeries(() => {
      var newTimeSeries = props.timeSeries
      var newChartConfig = {
        options: getOptions(newTimeSeries),
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
            type="line"
            width="100%"/>
        </div>
      </div>
    </div>
  );
}

export default MyChart;