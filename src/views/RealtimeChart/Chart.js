import React, { Component } from "react";
import Chart from "react-apexcharts";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import AnimatedNumber from 'react-animated-number';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      options: {
        foreColor: '#fffff',
        colors: ['#8fa200'],
        chart: {
          id: "basic-bar",
          background: 'rgba(26,39,55,200)'
        },
        xaxis: {
          categories: [1,2,3,4,5,6,7, 8, 9 ,10, 11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
        },
        yaxis: {
          min: 0,
          max: 10,
        }

      },
      series: [
        {
          name: "series-1",
          data: [1,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };
  }

 componentDidMount() {


  setInterval(() => {
    setTimeout(() => {     

      if (this.state.index < 20){
      const newData = [...this.state.series[0].data]


      
      //newData.shift()
      
      const newPoint = Math.round(newData[this.state.index] * 5 + newData[this.state.index], 1)
      newData[this.state.index + 1] = newPoint  
      const newCategories = [...this.state.options.xaxis.categories]


      if (newPoint > this.state.options.yaxis.max){
        console.log("currentmax", this.state.options.yaxis.max)

        
        this.setState(prevState => (console.log(prevState) , {

        index: prevState.index + 1,
        series: [{
          "name": "series-1",
          "data": newData
        }],
        options: {
         ...this.state.options,
          xaxis: {...this.state.options.xaxis, 
            categories: newCategories
            },
          yaxis: {...prevState.options.yaxis,
            max: prevState.series[0].data[prevState.index] * Math.pow( 1 + 5 , 3) + 1}
          }

      }

      )
      )
      }
      else{
        
        this.setState(prevState => (console.log(prevState) , {

        index: prevState.index + 1,
        series: [{
          "name": "series-1",
          "data": newData
        }],
        options: {
         ...this.state.options,
          xaxis: {...this.state.options.xaxis, 
            categories: newCategories
            },
          yaxis: {...prevState.options.yaxis, 
            max: prevState.options.yaxis.max + 1
            }
          }

      }

      )
      )
      }
      }
      else{
        this.setState({index: 0})
      }




    } , 1500);
    }, 1500);
    }
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
          <CardHeader color={this.props.color}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="100%"
              height="300"
            />
          
                      </CardHeader>
                      </div>
            <CardBody>
              <h4 >{this.props.title} {` Day ${this.state.index + 1} `} </h4>
                <h4>
                    <AnimatedNumber
                        style={{
                            transition: '0.8s ease-out',
                            transitionProperty:
                                'background-color, color'
                        }}
                        frameStyle={perc => (
                            perc === 100 ? {} : {backgroundColor: '#8fa200'}
                        )}
                        stepPrecision={0}
                        value={this.state.series[0].data[this.state.index]}
                        formatValue={n => `${n} ` +
                            ''}/>
                </h4>
            </CardBody>
        </div>
      </div>
    );
  }
}

export default App;