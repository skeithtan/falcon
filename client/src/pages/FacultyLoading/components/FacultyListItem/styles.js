export const styles = theme => ({
    facultyListItemContainer: {
        cursor: "grab",
        transition: "300ms all",

        "&:hover": {
            background: theme.palette.grey["200"],
        },
    },

    listItem: {
        background: "inherit",
    },
});
