import React, {useEffect} from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import {formatDateOnlyDate} from "utils/date";
import {differenceInDays} from 'date-fns';

import {usePrevious} from "utils/misc";

export default function Parameter(props) {
  const prevProps = usePrevious(props)
  const [firstCase,
    setFirstCase] = React.useState();
  const [firstDead,
    setFirstDead] = React.useState();
  const [timeBetween,
    setTimeBetween] = React.useState();
  const [deadRate,
    setDeadRate] = React.useState();
  const [highestCase,
    setHighestCase] = React.useState(0);
  const [highestCaseDay,
    setHighestCaseDay] = React.useState();
  const [highestDeath,
    setHighestDeath] = React.useState(0);
  const [highestDeathDay,
      setHighestDeathDay] = React.useState();
  const [timeBetweenHighest,
    setTimeBetweenHighest] = React.useState();
  //   const [tested,     setTested] = React.useState(null); const [cured,
  // setCured] = React.useState(null);

  useEffect(() => {
    if (prevProps !== null && prevProps !== undefined && props.restart !== prevProps.restart) {
      setFirstCase(undefined)
      setFirstDead(undefined)
      setTimeBetween(undefined)
      setDeadRate(undefined)
      setHighestCase(0)
      setHighestCaseDay(undefined)
      setHighestDeath(0)
      setHighestDeathDay(undefined)


      return;
    }
    if (props.data !== null && props.data !== undefined) {

      setFirstCase((oldFirstCase => {
        if (oldFirstCase === undefined) {
          if (props.data.confirmed != null && props.data.confirmed > 0) {
            return props.data.lastUpdate
          }
        }
        return oldFirstCase
      }))

      setFirstDead((oldFirstDead => {
        if (oldFirstDead === undefined) {
          if (props.data.deaths != null && props.data.deaths > 0) {
            setTimeBetween(differenceInDays(props.data.lastUpdate, firstCase))
            return props.data.lastUpdate
          }
        }
        return oldFirstDead
      }))

      setHighestCase((oldHighest => {
        if (oldHighest < props.data.deltaConfirmed) {
          setHighestCaseDay(props.data.lastUpdate)
          return props.data.deltaConfirmed
        }

        return oldHighest
      }))

      setHighestDeath(oldHighestDeaths => {
        
        if (prevProps.data !== null) {
          if (oldHighestDeaths < props.data.deaths - prevProps.data.deaths) {
            setHighestDeathDay(props.data.lastUpdate)
            return (props.data.deaths - prevProps.data.deaths)
          }
        }

        return oldHighestDeaths
      })



      

      setDeadRate((props.data.deaths / props.data.confirmed * 100).toFixed(2))
    }
  }, [props.data, props.restart]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>


              <Card >

                <CardBody >
                  <p style={{
                    fontSize: 16
                  }}>
                    {"First case"}
                    {" "}

                    {":  "}
                    {formatDateOnlyDate(firstCase)}

                  </p>

                  <p style={{
                    fontSize: 16
                  }}>
                    {"First dead"}
                    {" "}

                    {":  "}
                    {formatDateOnlyDate(firstDead)}

                  </p>
                  <p style={{
                    fontSize: 16
                  }}>
                    {"Days between"}
                    {" "}

                    {":  "}
                    {timeBetween}

                  </p>
                  <p style={{
                    fontSize: 16
                  }}>
                    {"Dead rate"}
                    {" "}

                    {":  "}
                    {deadRate}{" %"}

                  </p>

                </CardBody>
              </Card>
            
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>

              <Card >

                <CardBody >
                  <p style={{
                    fontSize: 16
                  }}>
                    {"Highest case"}
                    {" "}

                    {":  "}
                    {highestCase}

                  </p>

                  <p style={{
                    fontSize: 16
                  }}>
                    {"Highest Case Day"}
                    {" "}

                    {":  "}
                    {formatDateOnlyDate(highestCaseDay)}

                  </p>
                  <p style={{
                    fontSize: 16
                  }}>
                    {"Highest death toll"}
                    {" "}

                    {":  "}
                    {highestDeath}

                  </p>
                  <p style={{
                    fontSize: 16
                  }}>
                    {"Highest Death Day"}
                    {" "}

                    {":  "}
                    {formatDateOnlyDate(highestDeathDay)}

                  </p>

                </CardBody>
              </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
