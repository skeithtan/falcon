export const styles = theme => ({
    printPreviewModal: {
        overflowY: "scroll",
        overflowX: "hidden",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    printPreviewModalBody: {
        flex: 1,
        height: "100%",
        overflowY: "scroll",
    },
    printPreviewTitle: {
        flex: 1,
        fontWeight: theme.typography.fontWeightLight,
    },
    settingsContainer: {
        background: theme.palette.grey["100"],
        padding: theme.spacing.unit * 5,
        borderRight: `1px solid ${theme.palette.grey["400"]}`,
        color: theme.palette.common.white,
        overflowY: "scroll",
        height: "100%",
        boxSizing: "border-box",
        boxShadow: theme.shadows[24],
    },
    printPageContainer: {
        background: theme.palette.common.white,
        padding: theme.spacing.unit * 8,
        maxWidth: 1024,
        width: "100%",
        margin: 0,
    },
    printPage: {
        maxWidth: 1024,
        minHeight: 1600,
        height: "100%",
        width: "100%",
        background: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
        boxSizing: "border-box",
        boxShadow: theme.shadows[24],
    },
    printPreviewBackdrop: {
        padding: theme.spacing.unit * 5,
        background: theme.palette.grey["800"],
        display: "flex",
        justifyContent: "center",
    },
    printPreviewPagesContainer: {
        overflowY: "scroll",
        height: "100%",
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