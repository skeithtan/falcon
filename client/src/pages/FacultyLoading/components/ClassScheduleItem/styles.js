import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import BlueGrey from "@material-ui/core/colors/blueGrey";


export const styles = theme => ({
    classScheduleItemContainer: {
        borderLeft: "4px solid",
        padding: theme.spacing.unit * 2,
        transition: "all 300ms",
    },

    classScheduleWithFaculty: {
        borderColor: theme.palette.primary.main,
        background: lighten(theme.palette.primary.main, 0.92),
        color: theme.palette.primary.dark,

        "&.selected": {
            background: lighten(theme.palette.primary.main, 0.85),
        },
    },

    classScheduleWithoutFaculty: {
        borderColor: BlueGrey["300"],
        background: lighten(BlueGrey["400"], 0.95),
        color: darken(BlueGrey["900"], 0.2),

        "&.selected": {
            background: lighten(BlueGrey["400"], 0.85),
        },
    },
});
