import { lighten } from "@material-ui/core/styles/colorManipulator";
import { appBarExtension } from "../../../../components/styles";


export const styles = theme => ({
    facultyLoadingHeader: {
        ...appBarExtension(theme),
        paddingLeft: theme.spacing.unit * 3,
    },
    termSchedulesPaper: {
        background: lighten(theme.palette.primary.light, 0.7),
        transitionDuration: theme.transitions.duration.short,
        "&:focus-within": {
            background: lighten(theme.palette.primary.light, 0.95),
        },
    },
    termSchedulesSelect: {
        padding: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
});