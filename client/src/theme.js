import getMuiTheme from "material-ui/styles/getMuiTheme";
import { indigo700, grey50 } from "material-ui/styles/colors";
import lightbaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

const palette = {
    //Insert light base theme default and override color scheme
    ...lightbaseTheme,
    primary1Color: indigo700,
};

export default getMuiTheme({
    palette: palette,
    appBar: {
        color: grey50,
        textColor: palette.primary1Color,
    },
});