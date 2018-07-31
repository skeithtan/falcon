import { genericModalStyle } from "../../../../../components/styles";

export const styles = theme => ({
    ...genericModalStyle,
    cardsContainer: {
        overflowY: "auto",
        padding: theme.spacing.unit * 4,
        background: theme.palette.grey["100"],

        border: "1px solid",
        borderColor: theme.palette.grey["300"],

        // Offset the margins
        marginLeft: -24,
        marginRight: -24,
    },
    addClassCard: {
        minHeight: 400,
        height: "100%",
        transition: "300ms all",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background: theme.palette.grey["200"],
        padding: theme.spacing.unit * 4,
        fontSize: 16,
        boxSizing: "border-box",
        minWidth: 240,

        "&:hover": {
            cursor: "pointer",
        },
    },
    classScheduleCard: {
        padding: theme.spacing.unit * 3,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "visible",
        minWidth: 240,
    },
    removeIconButton: {
        background: theme.palette.grey["100"],
        borderRadius: "50%",
        boxShadow: theme.shadows[4],

        width: 24,
        height: 24,

        position: "absolute",
        top: -8,
        right: -8,
    },
    removeIcon: {
        fontSize: 16,
    },
});
