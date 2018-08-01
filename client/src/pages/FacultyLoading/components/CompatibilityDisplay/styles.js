import Amber from "@material-ui/core/colors/amber";
import Green from "@material-ui/core/colors/green";
import Red from "@material-ui/core/colors/red";
import { lighten, darken } from "@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    icon: {
        width: 32,
        height: 32,
    },
    root: {
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    compatibleItem: {
        background: lighten(Green["400"], 0.9),
        color: Green["800"],
    },
    incompatibleItem: {
        background: lighten(Red["400"], 0.9),
        color: Red["800"],
    },
    unknownCompatibilityItem: {
        background: lighten(Amber["400"], 0.9),
        color: darken(Amber["900"], 0.3),
    },
});
