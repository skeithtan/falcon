import { formContainer } from "../../../../../components/styles";


export const styles = theme => ({

    container: {
        ...formContainer(theme),
    },

    form: {
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        display: "grid",
        gridRowGap: `${theme.spacing.unit * 3}px`,
        justifyItems: "start",
    },

    reviewForm: {
        width: "100%",
    },
});