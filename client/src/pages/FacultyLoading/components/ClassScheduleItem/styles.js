import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import BlueGrey from "@material-ui/core/colors/blueGrey";

export const styles = theme => ({
    classScheduleItemContainer: {
        padding: theme.spacing.unit * 2,
        transition: "all 200ms",
        cursor: "pointer",

        "&.hoveringFaculty": {
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 16,
            boxShadow: theme.shadows[8],
            opacity: "1 !important",
        },

        "&.incompatibleWithHovering": {
            opacity: 0.5,
        },

        "&.compatibleWithHovering": {
            boxShadow: theme.shadows[5],
        },
    },

    classScheduleWithFaculty: {
        background: lighten(theme.palette.primary.main, 0.92),
        color: theme.palette.primary.dark,

        "&:hover": {
            background: lighten(theme.palette.primary.main, 0.8),
        },

        "&.selected": {
            background: lighten(theme.palette.primary.main, 0.7),
            opacity: "1 !important",
        },

        "&.hoveringFaculty": {
            background: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
    },

    classScheduleWithoutFaculty: {
        background: lighten(BlueGrey["400"], 0.9),
        color: darken(BlueGrey["900"], 0.2),

        "&:hover": {
            background: lighten(BlueGrey["400"], 0.8),
        },

        "&.selected": {
            background: lighten(BlueGrey["400"], 0.7),
            opacity: "1 !important",
        },

        "&.hoveringFaculty": {
            background: BlueGrey["400"],
            color: theme.palette.common.white,
        },
    },

    compatibilityPopoverPaper: {
        maxWidth: 320,
    },

    classScheduleAvatar: {
        height: 32,
        width: 32,
        fontSize: 16,
    },
});
