import { appBarExtension } from "../../../../components/styles";

export const styles = theme => ({
    header: {
        ...appBarExtension(theme)
    },
    tabs: {
        color: theme.palette.common.white,
        "&:focus": {
            color: "#fff",
        },
    },
    tabsIndicator: {
        background: theme.palette.common.white,
    },
});