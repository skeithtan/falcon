export default theme => ({
    facultyDetail: {
        overflowY: "scroll",
    },

    emptyState: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    cards: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        display: "grid",
        justifyItems: "center",
        gridRowGap: `${theme.spacing.unit * 3}px`,
        width: "100%",
    },
});