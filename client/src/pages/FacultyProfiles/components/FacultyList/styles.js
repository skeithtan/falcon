import { activeItem } from "../../../../components/styles";


export const styles = theme => ({
    facultyListContainer: {
        background: theme.palette.background.paper,
        borderRight: "1px solid",
        borderColor: theme.palette.grey["300"],
        overflowY: "scroll",
        position: "relative",
    },
    facultyList: {
        width: "100%",
    },
    listSection: {
        backgroundColor: "inherit",
    },
    ul: {
        padding: 0,
        background: theme.palette.background.paper,
    },
    addButton: {
        position: "fixed",
        left: 240,
        bottom: theme.spacing.unit * 3,
    },
});