import React, { Component } from "react";
import Chart from "react-apexcharts";

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
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994]
        }
      },
      series: [
        {
          name: "series-1",
          data: [1,6,36,186, 900]
        }
      ]
    };
  }

 componentDidMount() {


  setInterval(() => {
    setTimeout(() => {     

      console.log(this.state)
      const newData = [...this.state.series[0].data]
      //newData.shift()
      newData.push(newData[newData.length - 1] * 5 + newData[newData.length -1])

      const newCategories = [...this.state.options.xaxis.categories]
      //console.log(newCategories)
     //newCategories.shift()
     newCategories.push(getRandomInt(2000,3000))

      this.setState(prevState => ({
        series: [{
          "name": "series-1",
          "data": newData
        }],
        options: { ...this.state.options,  xaxis: {...this.state.options.xaxis, 
          categories: newCategories
        } }

      }))

    } , 500);
    }, 500);
    }
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;