import React, {useEffect}  from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CountryDropDown from "components/Country/Country.js";
import Icon from "@material-ui/core/Icon";
import Pause from "@material-ui/icons/Pause";
import Play from "@material-ui/icons/PlayArrow";
import Forward from "@material-ui/icons/FastForward";
import Rewind from "@material-ui/icons/FastRewind";
import Restart from "@material-ui/icons/SettingsBackupRestore";
import corona from "variables/assets/img/corona.jpg";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useGlobal, setGlobal } from 'reactn';

import {usePrevious} from "utils/misc";

export default function Parameter(props) {
  

  const prevProps = usePrevious(props)
  const [country,
    setCountry] = useGlobal("country")

  const [stop,
      setStop] = React.useState(false);


  const pause = () => {
    setStop(true)

  }

  const restart = () => {
    
    if (props.restart  !== null && props.restart !== undefined) {
      props.restart()
    }
    setStop(false)
  }

  const start = () => {
    setStop(false)
  }

  useEffect(() => {

    let mounted = true;
        let interval = setInterval(() => {


          setTimeout(() => {
            
            if (stop || props.stop ) {
              
              return clearInterval(interval)
            }
            if (mounted) { //*********************************************

              if (props.onTick !== null && props.onTick !== undefined) {
                props.onTick()
              }
    
    
            } //*********************************************************
          }, 200);
        }, 200);
    
  
      // }
      
    return () => {
      mounted = false;
    };
  }, [country, props.stop, stop]);
 


  return (
    <div>

      {/* <Localize getTranslations={getTranslations}/> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#corona" onClick={e => e.preventDefault()}>
                <img src={corona} alt="..."/>
              </a>
            </CardAvatar>
            <CardBody >
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <CountryDropDown
                    onSelectedCountry={(country) => {
                      setGlobal({country: country.country})
                  }}></CountryDropDown>
                  <h3>{country}</h3>

                </GridItem>
                <GridItem xs={12} sm={8} md={8}>
                  <GridContainer>
                  <GridItem xs={12} sm={2} md={2}>
                      <Icon onClick={() => start()}
                        >
                        {<Play></Play>}
                      </Icon>
                    </GridItem>
                    <GridItem xs={12} sm={2} md={2}>
                      <Icon onClick={() => pause()}
                        >
                        {<Pause></Pause>}
                      </Icon>
                    </GridItem>
                    <GridItem xs={12} sm={2} md={2}>
                      <Icon onClick={() => restart()}
                        >
                        {<Restart></Restart>}
                      </Icon>
                    </GridItem>
                    {/* <GridItem xs={12} sm={2} md={2}>
                      <Icon onClick={() => pause()}
                        >
                        {<Forward></Forward>}
                      </Icon>
                    </GridItem>
                    <GridItem xs={12} sm={2} md={2}>
                      <Icon onClick={() => pause()}
                        >
                        {<Rewind></Rewind>}
                      </Icon>
                    </GridItem> */}
                  </GridContainer>
                  <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                  <CustomInput
                    labelText="Velocity"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: "0.1 second"
                    }}
                  />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                    labelText="Step"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: "1"
                    }}
                  />
                    </GridItem>
                  </GridContainer>

                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
