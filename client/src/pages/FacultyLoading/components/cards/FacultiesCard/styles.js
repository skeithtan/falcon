export const styles = theme => ({
    facultiesCardContainer: {
        height: "100%",
    },
    facultiesListContainer: {
        overflow: "hidden",
    },
    toolbar: {
        background: theme.palette.common.white,
        transition: "300ms all",

        "&.compatibleFacultiesView": {
            color: theme.palette.primary.main,
        },
    },
    searchInput: {
        padding: 8,
        boxSizing: "border-box",
    },
    searchContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    searchAdornment: {
        color: theme.palette.grey["600"],
    },
    facultyList: {
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflowY: "auto",
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
