import {getRandomInt} from './utils.js';
import data from "../../variables/assets/data.json";
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

export function infection(series, country) {
    var countryData = Enumerable
        .from(data)
        .where("$.country==='" + country + "'")
        .orderBy("$.lastUpdate")
        .toArray()

        if (series.length < countryData.length - 1) {
            series.push({
                timeStamp: formatDateOnlyDate(countryData[series.length - 1].lastUpdate),
                value: countryData[series.length - 1].confirmed
            })
            return {series: series, stop: false};
        } else 
            return {series: series, stop: true}

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

export function symptoms(series, country) {
    var countryData = Enumerable
        .from(data)
        .where("$.country==='" + country + "'")
        .orderBy("$.lastUpdate")
        .toArray()

    if (series.length < countryData.length - 1) {
        series.push({
            timeStamp: formatDateOnlyDate(countryData[series.length - 1].lastUpdate),
            value: countryData[series.length - 1].deltaConfirmed
        })
        return {series: series, stop: false};
    } else 
        return {series: series, stop: true}
    
}

export function ill(series, country) {
    var countryData = Enumerable
        .from(data)
        .where("$.country==='" + country + "'")
        .orderBy("$.lastUpdate")
        .toArray()

        if (series.length < countryData.length - 1) {
            series.push({
                timeStamp: formatDateOnlyDate(countryData[series.length - 1].lastUpdate),
                value: countryData[series.length - 1].deaths
            })
            return {series: series, stop: false};
        } else 
            return {series: series, stop: true}
}

export function deads(series, country) {
    var countryData = Enumerable
        .from(data)
        .where("$.country==='" + country + "'")
        .orderBy("$.lastUpdate")
        .toArray()

        if (series.length < countryData.length - 1) {
            series.push({
                timeStamp: formatDateOnlyDate(countryData[series.length - 1].lastUpdate),
                value: series.length < 2 ? countryData[series.length - 1].deaths: countryData[series.length - 1].deaths - countryData[series.length - 2].deaths
            })
            return {series: series, stop: false};
        } else 
            return {series: series, stop: true}
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
