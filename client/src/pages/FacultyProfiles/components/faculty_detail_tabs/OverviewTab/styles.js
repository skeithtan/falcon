export default theme => ({
    cards: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        display: "grid",
        justifyItems: "center",
        gridRowGap: `${theme.spacing.unit * 3}px`,
        width: "100%",
    },
})