export const styles = theme => ({
    printPreviewContainer: {
        overflowY: "scroll",
        overflowX: "hidden",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    printPreviewTitle: {
        flex: 1,
        fontWeight: theme.typography.fontWeightLight,
    },
    settingsContainer: {
        background: theme.palette.grey["100"],
        padding: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 5,
        borderRight: `1px solid ${theme.palette.grey["400"]}`,
        color: "white",
    },
    printPageContainer: {
        background: "white",
        padding: theme.spacing.unit * 8,
    },
    printContentContainer: {
        maxWidth: 1024,
        minHeight: 1600,
        padding: 12,
        background: "white",
        width: "100%",
    },
    printContentContainerBackdrop: {
        padding: theme.spacing.unit * 5,
        background: theme.palette.grey["800"],
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        overflowY: "scroll",
    },
    pnuLogo: {
        height: 64,
        width: 64,
    },
    printAvatar: {
        height: 80,
        width: 80,
    },
});