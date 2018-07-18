import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    icon: {
        height: 48,
        width: 48,
        color: theme.palette.grey["200"],

        "&.checked": {
            color: theme.palette.primary.light,
        },
    },
    availabilitySquare: {
        transition: "200ms all",
        background: theme.palette.common.white,
        height: 120,
        
        "&.clickable": {
            height: 160,
        },

        "&.checked": {
            background: lighten(theme.palette.primary.light, 0.9),
        },

        "&.clickable:hover": {
            background: lighten(theme.palette.primary.light, 0.8),
            cursor: "pointer",
        },
    },
});
