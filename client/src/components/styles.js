import Red from "@material-ui/core/colors/red";
import { lighten } from "@material-ui/core/styles/colorManipulator";

export const page = theme => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
});

export const form = theme => ({
    padding: theme.spacing.unit,
});

export const pageContainer = theme => ({
    position: "relative",
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,

    // Constrain content to margins
    width: "90%",
    maxWidth: 1400,

    // Center the page container
    marginLeft: "auto",
    marginRight: "auto",

    // Do not allow padding to increase height
    boxSizing: "border-box",
});

export const card = theme => ({
    width: "100%",
});

export const genericModalStyle = theme => ({
    form: {
        ...form(theme),
    },
    activeItem: {
        ...activeItem(theme),
    },
});

export const activeItem = theme => ({
    fontWeight: theme.typography.fontWeightMedium,
    borderLeft: "6px solid",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
    background: `${lighten(theme.palette.primary.light, 0.9)} !important`,

    "& span": {
        color: theme.palette.primary.dark,
        fontWeight: theme.typography.fontWeightMedium,
    },
});

export const split = theme => ({
    display: "grid",
    gridTemplateColumns: "320px auto",
});

export const chip = theme => ({
    chip: {
        display: "flex",
        justifyContent: "flex-start",
        background: lighten(theme.palette.primary.light, 0.9),

        "&:hover, &:focus": {
            background: lighten(theme.palette.primary.main, 0.75),
        },
    },
    chipText: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: theme.palette.primary.dark,
    },
});

export const falconLogo = theme => ({
    fontFamily: "Raleway",
    fontWeight: 700,
});

export const badge = theme => ({
    background: Red["600"],
    color: "white !important",
});

export const appBarExtension = theme => ({
    background: theme.palette.primary.main,
    minHeight: 56,
    flexGrow: 0,
    boxShadow: "0 0.3rem 0.3rem rgba(0,0,0,0.23)",
    zIndex: theme.zIndex.appBar,
});
