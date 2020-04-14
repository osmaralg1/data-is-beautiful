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

import { funcMap } from "variables/simulation/simulationRealData";
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
        initialBeginTime: null
    };


    componentDidMount() {
        //
        // Setup our aggregation pipelines
        //

        this.stream = new Stream();

        pipeline()
            .from(this.stream)
            .windowBy( "2800m")
            .emitOn("discard")
            .aggregate({
                value: { value: percentile(90) }
            })
            .to(EventOut, event => {
                const events = this.state.percentile90Out;
                events.push(event);
                this.setState({ percentile90Out: events });
            });

        pipeline()
            .from(this.stream)
            .windowBy("600m")
            .emitOn("discard")
            .aggregate({
                value: { value: percentile(50) }
            })
            .to(EventOut, event => {
                const events = this.state.percentile50Out;
                events.push(event);
                this.setState({ percentile50Out: events });
            });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data === this.props.data) {
            return
        }

        if (this.props.data !== null && this.props.data !== undefined) {      
            const timestamp = new Date(this.props.data.lastUpdate + increment);
            
            const value = funcMap[this.props.function](this.props.data, prevProps.data)
        
            let max = this.state.max
            if (value > max)
                max = value
    
            const event = new TimeEvent(timestamp, parseInt( value, 10));
        

            // Raw events
            const newEvents = this.state.events;
                        
            newEvents.push(event);
            if (this.state.initialBeginTime === null) {
                this.setState({events: newEvents, max: max, initialBeginTime: timestamp});
            } else {
                this.setState({events: newEvents, max: max});
            }
            

            // Let our aggregators process the event
            this.stream.addEvent(event);

        }

    }


    render() {
        

        const fiveMinuteStyle = {
            value: {
                normal: { fill: "#619F3A", opacity: 0.2 },
                highlight: { fill: "619F3A", opacity: 0.5 },
                selected: { fill: "619F3A", opacity: 0.5 }
            }
        };

        const scatterStyle = {
            value: {
                normal: {
                    fill: "steelblue",
                    opacity: 0.5
                }
            }
        };

        const eventSeries = new TimeSeries({
            name: "raw",
            events: this.state.events.toArray()
        });

        const perc50Series = new TimeSeries({
            name: "five minute perc50",
            events: this.state.percentile50Out.toArray()
        });

        const perc90Series = new TimeSeries({
            name: "five minute perc90",
            events: this.state.percentile90Out.toArray()
        });

        // Charts (after a certain amount of time, just show hourly rollup)
        const charts = (
            <Charts>
                <BarChart
                    axis="y"
                    series={perc90Series}
                    style={fiveMinuteStyle}
                    columns={["value"]}
                />
       
            </Charts>
        );

        const dateStyle = {
            fontSize: 12,
            color: "#AAA",
            borderWidth: 1,
            borderColor: "#F4F4F4"
        };

        const style = styler([
            { key: "perc50", color: "#C5DCB7", width: 1, dashed: true },
            { key: "perc90", color: "#DFECD7", width: 2 }
        ]);

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
                <div>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <span style={dateStyle}>{endTime.toString()}</span>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <Resizable>
                                <ChartContainer timeRange={timeRange}>
                                    <ChartRow height="150">
                                        <YAxis
                                            id="y"
                                            label="Value"
                                            min={0}
                                            max={this.state.max}
                                            width="70"
                                            type="linear"
                                        />
                                        {charts}
                                    </ChartRow>
                                </ChartContainer>
                            </Resizable>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null
        }

    }
}

// Export example
export default Realtime;