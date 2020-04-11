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

  const getOptions = (timeSeries, options) => {
    return {

      theme: {
        monochrome: {
          enabled: true,
          color: props.bar_color,
          //shadeTo: 'dark',
          shadeIntensity: 400
        }
      },
      dataLabels: {
        style: {
          colors: ['#FF0000']
        },
        enabled: false
      },
      chart: {
        id: "basic-bar",
        background: 'rgba(26,39,55,15)',
        
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

      },
      tooltip: {
        fillSeriesColor: true,
        theme: 'dark',
        custom: function({series, seriesIndex, dataPointIndex, w}) {

          console.log(series)
          console.log(series, seriesIndex, dataPointIndex, w)
          return '<div class="container">' +

                    '<span style="margin-left: 5px; margin-top: 13px; height: 15px; width: 15px; background-color:' +
                    props.bar_color + '; border-radius: 50%; float: left;">' +

                    '</span>' +

          '<div class="row" style="float: left; margin-top: 10px; text-align: center; display:inline-block; min-width: 50px;">' +

                    '<p style="color: #555555;">' +
                      numberWithCommas(series[seriesIndex][dataPointIndex]) +
                    '</p>' +
                  '</div>' + '</div>'
  }
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

  useEffect(() => {
  
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