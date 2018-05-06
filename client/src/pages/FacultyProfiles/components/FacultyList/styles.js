export default theme => ({
    facultyList: {
        background: theme.palette.background.paper,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.grey["300"],
        overflowY: "scroll",
        position: "relative",
    },

    listSection: {
        backgroundColor: "inherit",
    },

    ul: {
        padding: 0,
        background: theme.palette.background.paper,
    },

    addButton: {
        position: "fixed",
        left: 240,
        bottom: theme.spacing.unit * 3,
    },

    activeListItem: {
        background: theme.palette.grey["200"],
        borderStyle: "solid",
        borderWidth: 1,
        borderRight: 0,
        borderLeft: 0,
        borderColor: theme.palette.grey["A100"],
    },

    activeListItemText: {
        fontWeight: theme.typography.fontWeightMedium,
    },

    loadingIndicatorWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
})