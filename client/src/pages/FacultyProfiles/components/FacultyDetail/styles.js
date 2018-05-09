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

    selectFacultyState: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    selectFacultyText: {
        color: theme.palette.grey["600"],
    },
});