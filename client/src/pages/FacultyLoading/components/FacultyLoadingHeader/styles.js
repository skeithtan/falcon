export default theme => ({
    header: {
        background: theme.palette.primary.main,
        minHeight: 52,
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