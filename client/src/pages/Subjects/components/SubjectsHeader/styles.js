import { lighten } from "@material-ui/core/styles/colorManipulator";
import { split } from "../../../../components/styles";


export const styles = theme => ({
    subjectsHeader: {
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
    split: split(theme),
});