import { lighten } from "@material-ui/core/styles/colorManipulator";
import { appBarExtension, split } from "../../../../components/styles";


export const styles = theme => ({
    facultyLoadingHeader: {
        ...appBarExtension(theme),
        ...split(theme),
    },
    termSchedulesPaper: {
        background: lighten(theme.palette.primary.light, 0.7),
        transitionDuration: theme.transitions.duration.short,
        "&:focus-within": {
            background: lighten(theme.palette.primary.light, 0.95),
        },
    },
    termSchedulesSelectWrapper: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    termSchedulesSelect: {
        padding: theme.spacing.unit,
        width: "100%",
        boxSizing: "border-box",
    },
    tabs: {
        color: theme.palette.common.white,
        "&:focus": {
            color: "#fff",
        },
    },
    tabsFlexContainer: {
        height: "100%",
    },
    tabsIndicator: {
        background: theme.palette.common.white,
    },
});
