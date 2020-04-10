import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CountryDropDown from "components/Country/Country.js";

import Localize from "components/Localize/Localize.js";
import corona from "variables/assets/img/corona.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  const [country, setCountry] = React.useState("Germany");

  const setSelectedCountry = (country) => {
    if (props.onSelectedCountry !== null && props.onSelectedCountry !== undefined)
        props.onSelectedCountry(country)
    setCountry(country.country)
  }


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
        <GridItem xs={12} sm={6} md={6}>
              <CountryDropDown onSelectedCountry={(country) => {setSelectedCountry(country)}}></CountryDropDown>

              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
              <h3>{country}</h3>

              </GridItem>
</GridContainer>
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
