/*eslint-disable*/
import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";


const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div
        className={classes.container}
        style={{
        textAlign: "center"
      }}>
        <div>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href={props.configuration.website} target="_blank" className={classes.block}>
                {props.configuration.name}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href={props.configuration.imprint} target="_blank" className={classes.block}>
                Impressum
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href={props.configuration.privacy} target="_blank" className={classes.block}>
                Datenschutz
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href={props.terms} target="_blank" className={classes.block}>
                AGB
              </a>
            </ListItem>
          </List>
        </div>
        <p >
          {props.configuration.slogan}
        </p>
      </div>
      <div></div>
    </footer>
  );
}
