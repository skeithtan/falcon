export default theme => ({
    avatar: {
        background: theme.palette.grey["800"],
    },

    userButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    userNameDisplay: {
        color: "white",
        fontSize: 16,
        marginRight: 12,
    },

    currentUserDisplay: {
        padding: 16,
        display: "flex",
        flexDirection: "row",
        background: theme.palette.grey["200"],
        marginTop: theme.spacing.unit * -1,
    },

    userFullName: {
        fontWeight: "bold",
    },

    userEmail: {
        color: theme.palette.grey["700"],
    },

    userDetails: {
        marginLeft: 16,
        minWidth: 240
    }

});