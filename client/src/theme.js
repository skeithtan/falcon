import getMuiTheme from "material-ui/styles/getMuiTheme";
import { indigo700, grey800, deepPurple700 } from "material-ui/styles/colors";
import lightbaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

const palette = {
    //Insert light base theme default palette and override color scheme
    ...lightbaseTheme.palette,
    primary1Color: deepPurple700,
    accent3Color: grey800,
};

export default getMuiTheme({
    palette: palette,
    // appBar: {
    //     color: grey50,
    //     textColor: palette.primary1Color,
    // },
});