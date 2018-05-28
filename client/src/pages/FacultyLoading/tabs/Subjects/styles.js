import { pageContainer } from "../../../../components/styles";


export const styles = theme => ({
    subjects: {
        overflowY: "scroll",
    },

    pageContainer: {
        ...pageContainer(theme),
    },

    addButton: {
        position: "fixed",
        bottom: theme.spacing.unit * 5,
        right: theme.spacing.unit * 5,
    },
})