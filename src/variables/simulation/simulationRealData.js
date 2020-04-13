import {getRandomInt} from 'utils/misc.js';
import data from "variables/assets/data.json";

var Enumerable = require('linq');
function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}


export function formatDateOnlyDate(dateString) {
    if (dateString === null || dateString === undefined) 
        return null
    var d = new Date(dateString);
    var date = addZero(d.getDate(), 2);
    var month = addZero(d.getMonth() + 1, 2);

    var year = d.getFullYear()
    return date + "-" + month + "-" + year
    // + ":" + ms;
}

export function DateOnlyDate(dateString) {
    if (dateString === null || dateString === undefined) 
        return null
    var d = new Date(dateString);
    return d.getTime()
}

export function infection(data, series, country) {
    return getCountryData(data, series, country, "confirmed")

}

function infectionArray() {

    var infected = Array(12).fill(0)
    infected[0] = 1;
    infected[1] = 6;
    for (var i = 2; i < infected.length; i++) {
        infected[i] = (infected[i - 1] - infected[i - 2]) * 5 + infected[i - 1]
    }
    infected[12] = 8e7;
    return infected
}

export function symptoms(data, series, country) {
    return getCountryData(data, series, country, "deltaConfirmed")
}

export function ill(data, series, country) {
    return getCountryData(data, series, country, "deaths")
}

export function deads(data, series, country) {
    return getCountryData(data, series, country, "deaths", true)
}

export function timeSeries(series, percentage, start) {

    var stop = false;

    if (series[series.length - 1].timeStamp > start - 1) {
        var infected = infectionArray()
        if (series[series.length - 1].timeStamp < start + infected.length) {
            const newPoint = infected[series[series.length - 1].timeStamp - start]

            series.push({
                timeStamp: series[series.length - 1].timeStamp + 1,
                value: Math.round(newPoint * percentage)
            })
        } else {
            stop = true
        }
    } else {
        series.push({
            timeStamp: series[series.length - 1].timeStamp + 1,
            value: 0
        })

    }

    if (series.length > 5) {
        series.shift()
    }
    return {series: series, stop: stop};
}

export function random(series) {
    const newPoint = getRandomInt(0, 100)
    series.shift()
    series.push({
        timeStamp: series[series.length - 1].timeStamp + 1,
        value: newPoint
    })
    return series;

}

export function getData(country) {
    var countryData = Enumerable
        .from(data)
        .where("$.country==='" + country + "'")
        .orderBy("$.lastUpdate")
        .toArray()
    var startRecording = false
    var dataWithNumber = []
    countryData.map(data => {
        if (!startRecording) {
            if (data.confirmed > 0) {
                startRecording = true
                return dataWithNumber.push(data)
            }
            return null
        } else {
            return dataWithNumber.push(data)
        }
    })
    countryData.length = 0

    return dataWithNumber
}

export function getCountryData(data, series, country, propName, comparetoLast) {

    if (series.length < data.length) {
        series.push({
            timeStamp: DateOnlyDate(data[series.length].lastUpdate),
            value: comparetoLast === true
                ? series.length < 2
                    ? data[series.length][propName]
                    : data[series.length][propName] - data[series.length - 1][propName]: data[series.length][propName]
        })
        return {series: series, stop: false};
    } else {
        return {series: series, stop: true}
    }

}
