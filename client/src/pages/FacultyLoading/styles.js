import { page } from "../../components/styles";

export const styles = theme => ({
    facultyLoadingContainer: page(theme),
    facultyLoadingTermViewContainer: {
        height: "100%",
    },
    planNextTermBanner: {
        background: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    bannerContentContainer: {
        maxWidth: 1600,
        width: "90%",
        padding: theme.spacing.unit * 2,
        boxSizing: "border-box",
        margin: "auto",
        display: "flex",
        alignItems: "center",
    },
    bannerText: {
        marginRight: theme.spacing.unit * 4,
    },
});
