import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import teal from "@material-ui/core/colors/teal";
import { createMuiTheme } from "@material-ui/core/styles";


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

export const TEAL_THEME = makeTheme({
    primary: teal,
    secondary: teal,
    primaryShade: 600,
});

export const GREEN_THEME = createMuiTheme({
    palette: {
        primary: {
            main: "#058258",
        },
    },
});

export const INDIGO_THEME = makeTheme({
    primary: indigo,
    secondary: pink,
    primaryShade: 500,
    secondaryShade: 700,
});

export const BLUE_THEME = makeTheme({
    primary: blue,
    secondary: blue,
    primaryShade: 700,
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