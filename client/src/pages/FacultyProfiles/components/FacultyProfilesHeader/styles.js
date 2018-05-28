import { lighten } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => ({
    facultyProfilesHeader: {
        background: theme.palette.primary.main,
        minHeight: 52,
        flexGrow: 0,
    },
    searchPaper: {
        background: lighten(theme.palette.primary.light, 0.7),
        transitionDuration: theme.transitions.duration.short,
        "&:focus-within": {
            background: lighten(theme.palette.primary.light, 0.95),
        },
    },
    searchWrapper: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    searchInput: {
        padding: 6,
        boxSizing: "border-box",
    },
    searchAdornment: {
        opacity: 0.7,
    },
    tabs: {
        color: "white",
        "&:focus": {
            color: "#fff",
        },
    },
    tabsIndicator: {
        background: "white",
    },
    split: {
        display: "grid",
        gridTemplateColumns: "320px auto",
    },
});