import { lighten } from "@material-ui/core/styles/colorManipulator";
import { activeItem } from "../styles";


export default theme => ({
    drawer: {
        height: "100%",
        minWidth: 240,
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

            "& h3": {
                color: theme.palette.primary.main,
            },
        },
    },
    pageItemText: {
        "& h3": {
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: "0.95rem",
            color: theme.palette.grey["700"],
        },
    },
});