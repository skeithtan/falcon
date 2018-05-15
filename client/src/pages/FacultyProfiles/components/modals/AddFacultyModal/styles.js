export default theme => ({
    form: {
        width: 560,
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        display: "grid",
        gridRowGap: `${theme.spacing.unit * 3}px`,
        justifyItems: "start",
    },

    reviewForm: {
        width: "100%",
    },
})