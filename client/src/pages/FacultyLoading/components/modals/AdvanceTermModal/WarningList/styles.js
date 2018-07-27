import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import Amber from "@material-ui/core/colors/amber";

export const styles = theme => ({
    warningItemContainer: {
        background: lighten(Amber["100"], 0.5),
        color: darken(Amber["900"], 0.4),
        padding: theme.spacing.unit * 3,
    },

    warningIcon: {
        color: darken(Amber["900"], 0.4),
        height: 32,
        width: 32,
    },
});
