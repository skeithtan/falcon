export const styles = theme => ({
    facultyListItemContainer: {
        cursor: "grab",
        transition: "300ms all",
        padding: theme.spacing.unit * 2,

        "&:hover": {
            background: theme.palette.grey["200"],
        },
    }
});
