import { lighten } from '@material-ui/core/styles/colorManipulator';
import { appBarExtension, badge, split } from "../../../../components/styles";

export const styles = theme => ({
    facultyProfilesHeader: appBarExtension(theme),
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
        color: theme.palette.common.white,
        "&:focus": {
            color: "#fff",
        },
    },
    tabsIndicator: {
        background: theme.palette.common.white,
    },
    badgeContainer: {
        padding: `0 ${theme.spacing.unit * 2}px 0 0px`
    },
    badge: {
        ...badge(theme),
    },
    split: split(theme),
});