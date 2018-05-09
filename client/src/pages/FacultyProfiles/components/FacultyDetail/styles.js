export default theme => ({
    facultyDetail: {
        overflowY: "scroll",

        "& > div": {
            height: "100%",
        },

        "& .react-swipeable-view-container": {
            height: "100%",
        },
    },

    emptyState: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    emptyStateText: {
        color: theme.palette.grey["600"],
    },
});