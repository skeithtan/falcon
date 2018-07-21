import { lighten } from "@material-ui/core/styles/colorManipulator";
import { activeItem } from "../../../../components/styles";

export const styles = theme => ({
    drawerContent: {
        height: "100%",
        minWidth: 240,
        overflowX: "hidden",
    },
    drawerHeadWrapper: {
        padding: theme.spacing.unit * 3,
        background: lighten(theme.palette.primary.light, 0.95),
        boxSizing: "border-box",
        borderBottom: "1px solid",
        borderBottomColor: lighten(theme.palette.primary.light, 0.85),
    },
    falconLogo: {
        fontFamily: "Raleway",
        fontWeight: 600,
        fontSize: 20,
        color: theme.palette.primary.dark,
    },
    subtitles: {
        color: lighten(theme.palette.primary.dark, 0.3),
    },
    pnuLogo: {
        width: 80,
        height: 80,
    },
    pageItemsContainer: {
        paddingTop: theme.spacing.unit * 3,
    },
    pageItem: {
        transition: "all 200ms",

        "&.active": {
            ...activeItem(theme),
        },
    },
    pageItemText: {
        "& span": {
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: "0.95rem",
            color: theme.palette.grey["700"],
        },
    },
});
