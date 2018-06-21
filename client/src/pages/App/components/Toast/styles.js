import { lighten } from "@material-ui/core/styles/colorManipulator";


export const styles = theme => ({
    button: {
        color: lighten(theme.palette.primary.light, 0.3),
    },
});