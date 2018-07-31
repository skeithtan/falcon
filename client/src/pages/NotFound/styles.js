export const styles = theme => ({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.primary.main,
        overflowY: "auto",
    },

    messageGrid: {
        display: "flex",
        flexDirection: "column",
        color: theme.palette.common.white,
        maxWidth: 800,
        padding: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 20,

        "& h1": {
            padding: 0,
        },
    },

    sadFace: {
        fontSize: 160,
        margin: 0,
        fontWeight: theme.typography.fontWeightLight
    },

    bigMessage: {
        margin: 0,
        fontSize: 80,
    },

    smallMessage: {
        fontSize: 24,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 5,
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.grey["200"]
    },

    footer: {

    }
});