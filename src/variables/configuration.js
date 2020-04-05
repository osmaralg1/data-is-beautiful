import React from "react";

import Heart from "@material-ui/icons/Favorite";
import logo from "./assets/img/logo.svg";
import favicon from "./assets/img/favicon.png";

const website = "https://www.aachenvalley.de"
const privacy = "https://www.aachenvalley.de/?page_id=382"
const configuration = {
    name: "Aachen Valley",
    website: website,
    imprint: "https://www.aachenvalley.de/?page_id=388",
    privacy: privacy,
    term: "https://www.aachenvalley.de/?page_id=388",
    slogan: <span >
        Made with {" "}
        <Heart style={{
            fill: "red"
        }}/>
        {" "}
        by
        {" "}
        <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
            color: "#b5cf59",
            fontWeight: "bold"
        }}>
            <text style={{
                color: "#36a0ca"
            }}>Aachen</text>
            {" "}Valley</a>
    </span>,
    logoText: null,
    logo: logo,
    bgImage: null,
    title: "Data is beautiful - Aachen Valley",
    description: "The world's data, information and knowledge can be transformed into beautiful in" +
            "fographics and visualizations.",
    favicon: favicon,
    appleTouchIcon: favicon,
    color: {
        primaryColor: [
            "#45AC34", "#ab47bc", "#8e24aa", "#af2cc5"
        ],
        warningColor: [
            "#8fa200", "#c3d332", "#f9ff68", "#ffff9b"
        ],
        dangerColor: [
            "#f44336", "#ef5350", "#e53935", "#f55a4e"
        ],
        successColor: [
            "#004a00", "#007700", "#48A737", "#7cd966"
        ],
        infoColor: [
            "#005181", "#007db1", "#30ACE3", "#73deff"
        ],
        roseColor: [
            "#e91e63", "#ec407a", "#d81b60", "#eb3573"
        ],
        grayColor: [
            "#999",
            "#777",
            "#3C4858",
            "#AAAAAA",
            "#D2D2D2",
            "#DDD",
            "#b4b4b4",
            "#555555",
            "#333",
            "#a9afbb",
            "#eee",
            "#e7e7e7"
        ],
        blackColor: "#0e1b2c"
    },
    listActiveItemColor: "orange",
    cookie: {
        name: "dataIsBeautifulCookie",
        style: {
            background: "#007db1"
        },
        buttonStyle: {
            background: "white",
            color: "black",
            fontSize: "13px"
        },
        button: "Akzeptieren",
        text: <div>Wir benutzen Cookies, um die Nutzerfreundlichkeit der Website zu
            verbessern. Durch die Nutzung unserer Website stimmen Sie unserer Verwendung von
            Cookies zu.<br/>
            <a
                href={privacy}
                target="_blank"
                rel="noopener noreferrer">Mehr Informationen</a>
        </div>
    }

}

export {configuration};