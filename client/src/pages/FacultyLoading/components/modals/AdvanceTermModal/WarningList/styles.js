import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import Amber from "@material-ui/core/colors/amber";
import Red from "@material-ui/core/colors/red";

export const styles = theme => ({
    warningItemContainer: {
        background: lighten(Amber["100"], 0.5),
        color: darken(Amber["900"], 0.4),
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,

        "&.severe": {
            background: lighten(Red["100"], 0.5),
            color: Red["900"],
        },
    },

    warningIcon: {
        color: darken(Amber["900"], 0.4),
        height: 24,
        width: 24,

        "&.severe": {
            color: Red["900"],
        },
    },
});
