import { lighten } from '@material-ui/core/styles/colorManipulator';
import { badge, split } from "../../../../components/styles";

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
    badgeContainer: {
        padding: `0 ${theme.spacing.unit * 2}px 0 0px`
    },
    badge: {
        ...badge(theme),
    },
    split: split(theme),
});