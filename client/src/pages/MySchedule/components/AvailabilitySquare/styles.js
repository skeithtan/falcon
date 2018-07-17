import { lighten } from "../../../../../node_modules/@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    icon: {
        height: 64,
        width: 64,
        color: theme.palette.grey["200"],

        "&.checked": {
            color: theme.palette.common.white,
        },
    },
    availabilitySquare: {
        transition: "200ms all",
        background: theme.palette.common.white,
        height: 160,
        cursor: "pointer",

        "&.checked": {
            background: theme.palette.primary.light,
        },

        "&:hover": {
            background: lighten(theme.palette.primary.light, 0.2),
        },
    },
});
