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
        padding: theme.spacing.unit * 5,
        borderRight: `1px solid ${theme.palette.grey["400"]}`,
        color: "white",
        zIndex: theme.zIndex.mobileStepper,
        overflowY: "scroll",
    },
    printPageContainer: {
        background: "white",
        padding: theme.spacing.unit * 8,
        maxWidth: 1024,
        margin: 0,
    },
    printContentContainer: {
        maxWidth: 1024,
        minHeight: 1600,
        height: "100%",
        width: "100%",
        background: "white",
        marginBottom: theme.spacing.unit * 4,
        boxSizing: "border-box",
        boxShadow: theme.shadows[24],
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