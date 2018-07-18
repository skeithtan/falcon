import { falconLogo } from "../../../../components/styles";

export const styles = theme => ({
    appBar: {
        boxShadow: "0 0.3rem 0.3rem rgba(0,0,0,0.23)",
    },
    toolbar: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 2,
    },
    pageName: {
        display: "inline-block",
        fontSize: 20,
        fontWeight: theme.typography.fontWeightLight,
    },
    falconLogo: {
        ...falconLogo(theme),
        display: "inline-block",
        marginRight: 4,
        fontSize: 20,
    },
});
