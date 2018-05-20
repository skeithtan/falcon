export default theme => ({
    drawer: {
        height: "100%",
        minWidth: 240,
    },
    drawerHeadWrapper: {
        padding: theme.spacing.unit * 3,
        background: theme.palette.grey["100"],
        boxSizing: "border-box",
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.grey["300"],
    },
    falconLogo: {
        fontFamily: "Raleway",
        fontWeight: 600,
        fontSize: 20,
    },
    subtitles: {
        color: theme.palette.grey["600"],
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
            background: theme.palette.grey["100"],
            borderLeft: "6px solid",
            borderLeftColor: theme.palette.primary.main,

            "& h3": {
                color: theme.palette.primary.main,
            },
        },
    },
    pageItemText: {
        "& h3": {
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: theme.typography.fontSize,
            color: theme.palette.grey["700"],
        },
    },
});