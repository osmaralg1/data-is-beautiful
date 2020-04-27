/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Ring from "ringjs";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import AnimatedNumber from 'react-animated-number';
import 'assets/css/cardHeader.css'; // Tell webpack that Button.js uses these styles

import {numberWithCommas} from "utils/misc";
import {formatDateOnlyDate} from "utils/date";

import {funcMap } from "variables/simulation/simulationRealData";

import {
    TimeSeries,
    TimeRange,
    TimeEvent,
    Pipeline as pipeline,
    Stream,
    EventOut,
    percentile
} from "pondjs";

import {
    ChartContainer,
    ChartRow,
    Charts, 
    YAxis, 
    ScatterChart,
    BarChart,
    Resizable,
    Baseline,
} from "react-timeseries-charts";

import styler from "./styler";

const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const day = hours * 24
const increment = day;
const timeWindow = 100 * day;

class Realtime extends React.Component {
    static displayName = "AggregatorDemo";

    state = {
        events: new Ring(200),
        percentile50Out: new Ring(100),
        percentile90Out: new Ring(100),
        max: 0,
        initialBeginTime: null,
        value: 0
    };

    componentDidMount() {
        //
        // Setup our aggregation pipelines
        //

        this.stream = new Stream();

        pipeline()
            .from(this.stream)
            .windowBy( "1d")
            .emitOn("discard")
            .aggregate({
                value: { value: percentile(100) }
            })
            .to(EventOut, event => {
                const events = this.state.percentile90Out;
                events.push(event);
                this.setState({ percentile90Out: events });
            });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.restart != this.props.restart) {
            this.setState({
                events: new Ring(200),
                percentile50Out: new Ring(100),
                percentile90Out: new Ring(100),
                max: 0,
                initialBeginTime: null
            })

            this.stream = new Stream();

            pipeline()
                .from(this.stream)
                .windowBy( "1d")
                .emitOn("discard")
                .aggregate({
                    value: { value: percentile(100) }
                })
                .to(EventOut, event => {
                    const events = this.state.percentile90Out;
                    events.push(event);
                    this.setState({ percentile90Out: events });
                });
    
            pipeline()
                .from(this.stream)
                .windowBy("1d")
                .emitOn("discard")
                .aggregate({
                    value: { value: percentile(50) }
                })
                .to(EventOut, event => {
                    const events = this.state.percentile50Out;
                    events.push(event);
                    this.setState({ percentile50Out: events });
                });
                
            return
        }

        if (prevProps.data === this.props.data) {
            return
        }

        

        if (this.props.data !== null && this.props.data !== undefined) {      
            const timestamp = new Date(this.props.data.lastUpdate + increment);
            
            const value = funcMap[this.props.function](this.props.data, prevProps.data)
            if (value === null)
                return
        
            let max = this.state.max
            if (value > max)
                max = value
    
            const event = new TimeEvent(timestamp, parseInt( value, 10));
        

            // Raw events
            const newEvents = this.state.events;
                        
            newEvents.push(event);
            if (this.state.initialBeginTime === null) {
                this.setState({events: newEvents, max: max, value: value, initialBeginTime: timestamp});
            } else {
                this.setState({events: newEvents, max: max, value: value});
            }
            

            // Let our aggregators process the event
            this.stream.addEvent(event);

        }

    }


    render() {
        
        const fiveMinuteStyle = {
            
            value: {
                normal: { fill: "#FFFFFF", opacity: 0.2 },
                highlight: { fill: "FFFFFF", opacity: 0.5 },
                selected: { fill: "FFFFFF", opacity: 0.5 }
            },
             axis: { fontSize: 11, textAnchor: "left", fill: "#ff0000" }, 
             label: { fontSize: 12, textAnchor: "middle", fill: "#ff0000" }, 
             values: { fill: "none", stroke: "none" },


        };

        const perc90Series = new TimeSeries({
            name: "five minute perc90",
            events: this.state.percentile90Out.toArray()
        });

        // Charts (after a certain amount of time, just show hourly rollup)
        const style = styler();

        const charts = (

                <Charts style={style}>
                    <BarChart
                        axis="y"
                        series={perc90Series}
                        style={fiveMinuteStyle}
                        height={500}
                        columns={["value"]}
                        
                    />
                    <Baseline axis="value" value={1000} label="Avg" position="right" />
                </Charts>


        );
        const dateStyle = {
            fontSize: 12,
            color: "#FFFFFF",
            borderWidth: 3,
            borderColor: "#F4F4F4"
        };



        // Timerange for the chart axis
        if (this.props.data !== null && this.props.data !== undefined) {
            // const initialBeginTime = new Date(this.props.data.lastUpdate); 
            var initialBeginTime = this.state.initialBeginTime;
            if (initialBeginTime === null) {
                initialBeginTime = new Date(this.props.data.lastUpdate)
            }
        
            let beginTime;
            const endTime = new Date(this.props.data.lastUpdate);
            if (endTime.getTime() - timeWindow < initialBeginTime.getTime()) {
                beginTime = initialBeginTime;
            } else {
                beginTime = new Date(endTime.getTime() - timeWindow);
            }
            const timeRange = new TimeRange(beginTime, endTime);

            return (
                
                <Card style={{fontSize: "20px"}}>
                        <CardHeader color={this.props.color} >
                            <Resizable >
                                <ChartContainer  timeRange={timeRange} timeAxisStyle = {{ axis: { stroke: "white", pointerEvents: "none"}, values: { stroke: "none", fill: "white", font: "13px sans-serif" }}
                            }  >
                                    <ChartRow height={this.props.height} >
                                        <YAxis
                                            id="y"
                                            label= "Value"
                                            min={0}
                                            max={this.state.max}
                                            width="70"
                                            type="linear"
                                            style={{ label: { stroke: "none", fill: "white", font: "13px sans-serif"},  values: { stroke: "none", fill: "white", font: "13px sans-serif"}}}
                                        />
                                        {charts}
                                    </ChartRow>
                                </ChartContainer>
                            </Resizable>
                            </CardHeader>
                            <CardBody>
                            <h5 >{this.props.title}</h5>
        <p style={{
          fontSize: 16
        }}>
          {this.props.timestampTitle}
          {" "}
          {this.props.data !== null && this.props.data !== undefined
            ? formatDateOnlyDate(this.props.data.lastUpdate)
            : ""}
          {":  "}
          <AnimatedNumber
            style={{
            transition: '0.8s ease-out',
            transitionProperty: 'background-color, color',
            fontSize: 25,
            fontWeight: 600
          }}
            stepPrecision={0}
            value={this.state.value}
            formatValue={n => `${numberWithCommas(n)} `}/>

        </p>
                            </CardBody>
                    </Card>
            );
        } else {
            return null
        }

    }
}

// Export example
export default Realtime;