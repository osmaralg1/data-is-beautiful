import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";
import { numberWithCommas } from 'utils/misc.js'

import {DateOnlyDate} from 'utils/date.js';

function MyChart(props) {

  const options = {

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
        type: "datetime",   
        // min: 1580083200000, // here first day of country x
        labels: {
          show: true,
          rotate: 0,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
              colors: '#ffffff',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
          },
        }
        //categories: getTimeStamps(timeSeries),

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

          return '<div class="container">' +

                    '<span style="margin-left: 5px; margin-top: 13px; height: 15px; width: 15px; background-color:' +
                    props.bar_color + '; border-radius: 50%; float: left;">' +

                    '</span>' +

          '<div class="row" style="float: left; margin-top: 10px; text-align: center; display:inline-block; min-width: 50px;">' +

                    '<p style="color: #555555;">' +
                      numberWithCommas(series[seriesIndex][dataPointIndex]) +
                    '</p>' +
                  '</div> </div>'
  }
      }
    }


  const [series,
    setSeries] = useState([
      {
        name: "Infected people",
        data: []
      }
    ])

  useEffect(() => {
  
    if (props.data !== null && props.data !== undefined) {
      
      setSeries((oldSeries) => {
        var newData = oldSeries[0].data
        var lastData = null
        if (newData.length > 0)
          lastData = newData[newData.length - 1].lastData
        newData.push({y: props.method(props.data, lastData), x: DateOnlyDate(props.data.lastUpdate), lastData: props.data})
        
        var newSeries = [
          {
            name: oldSeries[0].name,
            data: newData
          }
        ]
        return newSeries
      })
    }
    


  }, [props.data]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height={props.height} />
        </div>
      </div>
    </div>
  );
}

export default MyChart;