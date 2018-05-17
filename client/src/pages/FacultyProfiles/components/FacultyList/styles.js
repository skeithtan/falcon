export default theme => ({
    facultyList: {
        background: theme.palette.background.paper,
        borderRight: "1px solid",
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
    listItem: {
        transition: "150ms",
    },
    activeListItem: {
        background: theme.palette.grey["100"],
        borderLeft: "4px solid",
        borderColor: theme.palette.primary.main,

        "& h3": {
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.primary.main,
        },
    },
})