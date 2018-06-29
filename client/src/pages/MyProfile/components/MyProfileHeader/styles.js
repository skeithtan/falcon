export const styles = theme => ({
    header: {
        background: theme.palette.primary.main,
        minHeight: 52,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        flexGrow: 0,
    },
    tabs: {
        color: theme.palette.common.white,
        "&:focus": {
            color: "#fff",
        },
    },
    tabsIndicator: {
        background: theme.palette.common.white,
    },
});