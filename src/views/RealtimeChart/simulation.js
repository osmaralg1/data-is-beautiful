import { getRandomInt } from './utils.js';

export function infection(series){

        const newPoint = (series[series.length - 1].value - series[series.length - 2].value) * 5 + series[series.length - 1].value
        if (series[series.length - 1].value >= 8e7){
            series[series.length - 1] = {
              timeStamp: series[series.length - 1].timeStamp,
              value: 8e7
          }
          return series;
        }
          series.push({
            timeStamp: series[series.length - 1].timeStamp + 1,
            value: newPoint
          })
        return series;

}

export function syntoms(series){

        var infected = Array(12).fill(0)
        infected[0] = 1;
        infected[1] = 6;

        for (var i=2; i < infected.length; i++){

          infected[i] = (infected[i - 1] - infected[i - 2] ) * 5 + infected[i - 1]
        }
        infected[12] = 8e7;
        console.log(infected)

        if (series[series.length - 1].timeStamp > 12){

            if (series[series.length - 1].timeStamp < 24){
              const newPoint = infected[series[series.length - 1].timeStamp - 13]
              series.push( {
                timeStamp: series[series.length - 1].timeStamp + 1,
                value: Math.round(newPoint * 0.2)
              }) 
            }

        }
        else{
          series.push({
            timeStamp: series[series.length - 1].timeStamp + 1,
            value: 0
          })
        }


        if (series.length > 5){
          series.shift()
        }
        return series;


}

export function random(series){

        const newPoint = getRandomInt(0,100)
        series.shift()
          series.push({
            timeStamp: series[series.length - 1].timeStamp + 1,
            value: newPoint
          })
        return series;

}



