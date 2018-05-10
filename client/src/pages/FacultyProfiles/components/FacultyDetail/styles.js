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
    cards: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        display: "grid",
        justifyItems: "center",
        gridRowGap: `${theme.spacing.unit * 3}px`,
        width: "100%",
    },
    expansionCards: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        justifyItems: "center",
        display: "grid",
        width: "100%",
    },
});