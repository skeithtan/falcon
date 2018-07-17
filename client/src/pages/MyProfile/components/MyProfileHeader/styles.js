import { appBarExtension } from "../../../../components/styles";

export const styles = theme => ({
    header: {
        ...appBarExtension(theme),
        display: "flex",
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    tabs: {
        color: theme.palette.common.white,
        "&:focus": {
            color: "#fff",
        },
    },
    tabsFlexContainer: {
        height: "100%",
    },
    tabsIndicator: {
        background: theme.palette.common.white,
    },
});
