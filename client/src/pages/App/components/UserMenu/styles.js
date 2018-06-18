export const styles = theme => ({
    currentUserDisplay: {
        padding: 16,
        display: "flex",
        flexDirection: "row",
        background: theme.palette.grey["200"],
        "&:focus": {
            outline: "none",
        },
    },
    userFullName: {
        fontWeight: "bold",
    },
    userDetails: {
        marginLeft: 16,
        minWidth: 240,
    },
});