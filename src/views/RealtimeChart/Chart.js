import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";
import { numberWithCommas } from './utils.js'
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
      markers: {
      colors: ['#F44336', '#E91E63', '#9C27B0']
      },
      theme: {
        monochrome: {
          enabled: true,
          color: props.bar_color,
          shadeTo: 'light',
          shadeIntensity: 0.8
        }
      },
      dataLabels: {
        style: {
          colors: ['#FF0000']
        }
      },
      chart: {
        id: "basic-bar",
        background: 'rgba(26,39,55,200)',
        
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: getTimeStamps(timeSeries),
              labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
                style: {
                    colors: ['#ffffff', '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff',
                    '#ffffff', '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff',
                    '#ffffff', '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'],
                    fontSize: '12px',
                    //fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 100,
                    cssClass: 'apexcharts-xaxis-label'
                  },
                 

              },
      },
      yaxis: {
        min: 0,    
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
              colors: ['#ffffff', '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff',
                    '#ffffff', '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
          },
          formatter: (value) => { 
            if (value > 1){
              return numberWithCommas(Math.round(value)) 
            }
            else{
              return Math.round(value * 100) / 100
            }
          },
        }
        //max: getYAxis(options),

      }
    }
  }

  const getSeries = (timeSeries) => {
    return [
      {
        name: "Infected people",
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
            height={props.height} />
        </div>
      </div>
    </div>
  );
}

export default MyChart;