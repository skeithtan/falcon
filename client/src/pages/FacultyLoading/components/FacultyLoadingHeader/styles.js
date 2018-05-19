export default theme => ({
    header: {
        background: theme.palette.primary.main,
        minHeight: 52,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
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
});