export default theme => ({
    facultyList: {
        background: theme.palette.background.paper,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.grey["300"],
        overflowY: "scroll",
        position: "relative"
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
})