import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import { darken, lighten } from "@material-ui/core/styles/colorManipulator";


export const styles = theme => ({
    rejectedBackground: {
        background: lighten(red["50"], 0.4),
        "& *": {
            color: red["800"],
        },
    },
    pendingBackground: {
        background: amber["50"],
        "& *": {
            color: darken(amber["900"], 0.3),
        },
    },
    acceptedBackground: {
        background: lighten(theme.palette.primary.main, 0.95),
        "& *": {
            color: theme.palette.primary.dark,
        },
    },
    topBar: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    icon: {
        fontSize: 40,
    },
});