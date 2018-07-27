export const styles = theme => ({
    facultiesCardContainer: {
        height: "100%",
    },
    facultiesListContainer: {
        overflow: "hidden",
    },
    searchInput: {
        padding: 8,
        boxSizing: "border-box",
    },
    searchContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        // background: theme.palette.grey["100"],
    },
    searchAdornment: {
        color: theme.palette.grey["600"],
    },
    facultyList: {
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflowY: "scroll",
        height: "100%",
    },
    facultyListSection: {
        backgroundColor: "inherit",
    },
    facultyUl: {
        backgroundColor: "inherit",
        padding: 0,
    },
});
