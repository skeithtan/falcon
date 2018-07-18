import Green from "@material-ui/core/colors/green";
import Red from "@material-ui/core/colors/red";
import { lighten } from "../../../../../node_modules/@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    icon: {
        width: 32,
        height: 32,
    },
    item: {
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    compatibleItem: {
        background: lighten(Green["400"], 0.9),
        color: Green["800"],
    },
    incompatibleItem: {
        background: lighten(Red["400"], 0.9),
        color: Red["800"],
    },
});
