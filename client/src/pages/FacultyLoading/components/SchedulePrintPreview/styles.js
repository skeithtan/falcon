export const styles = theme => ({
    printPreviewModal: {
        overflowX: "hidden",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    printPreviewModalBody: {
        height: "100%",
    },
    printPreviewTitle: {
        flex: 1,
        fontWeight: theme.typography.fontWeightLight,
    },
    printPageContainer: {
        background: theme.palette.common.white,
        padding: theme.spacing.unit * 8,
        maxWidth: 1024,
        width: "100%",
        margin: 0,
        display: "block",
    },
    printPage: {
        maxWidth: 1024,
        minHeight: 1600,
        height: "100%",
        width: "100%",
        background: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
        boxSizing: "border-box",
        boxShadow: theme.shadows[12],
    },
    printPreviewBackdrop: {
        padding: theme.spacing.unit * 5,
        background: theme.palette.grey["800"],
        display: "flex",
        justifyContent: "center",
    },
    printPreviewPagesContainer: {
        overflowY: "auto",
        height: "100%",
        position: "relative",
    },
    pnuLogo: {
        height: 64,
        width: 64,
    },
    printButton: {
        position: "absolute",
        bottom: 40,
        right: 40,
    },
    printIcon: {
        marginRight: theme.spacing.unit,
    },
});
