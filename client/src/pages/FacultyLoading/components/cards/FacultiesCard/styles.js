import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    facultiesCardContainer: {
        height: "100%",
    },
    facultiesListContainer: {
        overflowY: "scroll",
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
});
