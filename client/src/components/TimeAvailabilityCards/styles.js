export const styles = theme => ({
    cardColumnHead: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },

    availabilitySquaresContainer: {
        "& > div:not(:last-child)": {
            borderRight: "1px solid",
            borderColor: theme.palette.grey["200"],
        },
    },
});
