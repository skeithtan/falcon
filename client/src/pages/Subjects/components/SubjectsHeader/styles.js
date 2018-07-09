import { lighten } from "@material-ui/core/styles/colorManipulator";
import { appBarExtension, split } from "../../../../components/styles";


export const styles = theme => ({
    subjectsHeader: appBarExtension(theme),
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
        padding: theme.spacing.unit,
        boxSizing: "border-box",
    },
    searchAdornment: {
        opacity: 0.7,
    },
    split: split(theme),
});