import { getRandomInt } from './utils.js';


export function infection(series){
  var infected = infectionArray();      
  const newPoint = infected[series[series.length - 1].timeStamp]

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

function infectionArray(){

        var infected = Array(12).fill(0)
        infected[0] = 1;
        infected[1] = 6;
        for (var i=2; i < infected.length; i++){
          infected[i] = (infected[i - 1] - infected[i - 2] ) * 5 + infected[i - 1]
        }
        infected[12] = 8e7;
        return infected
}

export function symptoms(series){
  return timeSeries(series, 0.2, 14)
}

export function ill(series){
  return timeSeries(series, 0.2 * 0.06, 14 + 14)
}

export function deads(series){
  return timeSeries(series, 0.2 * 0.06 * 0.5, 14 + 14 + 7*4)
}

export function timeSeries(series, percentage, start){
        
        

        if (series[series.length - 1].timeStamp > start - 1){
          var infected = infectionArray()
          if (series[series.length - 1].timeStamp < start + infected.length){
            const newPoint = infected[series[series.length - 1].timeStamp - start]

            series.push( {
              timeStamp: series[series.length - 1].timeStamp + 1,
              value: Math.round(newPoint * percentage)
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



