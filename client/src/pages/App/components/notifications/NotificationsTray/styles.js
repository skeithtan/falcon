export const styles = theme => ({
    notificationsTrayTitle: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        padding: theme.spacing.unit,
        background: theme.palette.grey["100"],
    },

    notificationsTray: {
        width: 400,
        maxHeight: 560,
        display: "flex",
        flexDirection: "column",
    },
    notificationsTrayBody: {
        overflowY: "auto"
    }
});