import { pageContainer } from "../../../../components/styles";


export default theme => ({
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