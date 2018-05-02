import { createMuiTheme } from "material-ui/styles/index";

import blue from "material-ui/colors/blue";
import indigo from "material-ui/colors/indigo";
import pink from "material-ui/colors/pink";
import deepPurple from "material-ui/colors/deepPurple";
import teal from "material-ui/colors/teal";
import blueGrey from "material-ui/colors/blueGrey";
import grey from "material-ui/colors/grey";

function makeTheme({primary, secondary, primaryShade = 700, secondaryShade = 600}) {
    return createMuiTheme({
        palette: {
            primary: {
                main: primary[primaryShade],
            },
            secondary: {
                main: secondary[secondaryShade],
            },
        },
    });
}

export const PNU_THEME = makeTheme({
    primary: deepPurple,
    secondary: deepPurple,
    primaryShade: 600,
    secondaryShade: 600,
});

export const TEAL_THEME = makeTheme({
    primary: teal,
    secondary: deepPurple,
    primaryShade: 600,
});

export const INDIGO_THEME = makeTheme({
    primary: indigo,
    secondary: pink,
    primaryShade: 500,
    secondaryShade: 700,
});

export const BLUE_THEME = makeTheme({
    primary: blue,
    secondary: grey,
    primaryShade: 700,
    secondaryShade: 300,
});

export const GREY_THEME = makeTheme({
    primary: blueGrey,
    secondary: grey,
    primaryShade: 700,
    secondaryShade: 700,
});

export const PINK_THEME = makeTheme({
    primary: pink,
    secondary: pink,
});

