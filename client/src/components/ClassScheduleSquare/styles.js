import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    classScheduleSquare: {
        boxSizing: "border-box",
        padding: theme.spacing.unit * 3,
        background: theme.palette.common.white,
        height: "100%",
        display: "flex",
        alignItems: "center",
        minHeight: 120,

        "&.occupied": {
            background: lighten(theme.palette.primary.light, 0.9),
            color: theme.palette.primary.dark,
        },
    },
});
