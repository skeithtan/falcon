import { falconLogo } from "../../components/styles";


export const styles = theme => ({
    background: {
        height: "100vh",
        width: "100vw",
        background: theme.palette.grey["200"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    signInBox: {
        padding: theme.spacing.unit * 6,
        width: 360,
    },
    cardImage: {
        width: 80,
        height: 80,
    },
    form: {
        paddingTop: theme.spacing.unit * 4,
        display: "grid",
        gridRowGap: `${theme.spacing.unit * 3}px`,
    },
    formInput: {
        width: "100%",
    },
    buttonContainer: {
        marginTop: theme.spacing.unit * 2,
        display: "flex",
    },
    button: {
        marginTop: theme.spacing.unit * 5,
        marginLeft: "auto",
    },
    falconLogo: {
        ...falconLogo(theme),
        fontSize: 24,
    },
});