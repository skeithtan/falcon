export const styles = theme => ({
    blankState: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    messageWrapper: {
        display: "grid",
        gridRowGap: `${theme.spacing.unit * 2}px`,
        padding: theme.spacing.unit * 4,
        justifyItems: "center",
        textAlign: "center",
    },
    messageColor: {
        color: theme.palette.grey["700"],
    },
    icon: {
        fontSize: 100,
    },
    breakWord: {
        wordWrap: "break-word",
    },
    wordWrapContainer: {
        display: "table",
        tableLayout: "fixed",
        width: "100%",
        wordWrap: "break-word",
    },
});