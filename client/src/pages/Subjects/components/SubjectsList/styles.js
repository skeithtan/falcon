import { activeItem } from "../../../../components/styles";


export const styles = theme => ({
    subjectsListContainer: {
        background: theme.palette.background.paper,
        borderRight: "1px solid",
        borderColor: theme.palette.grey["300"],
        overflowY: "auto",
        position: "relative",
    },
    subjectsList: {
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
    listItem: {
        transition: "150ms",
    },
    activeListItem: {
        ...activeItem(theme),

        "& h3": {
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.primary.main,
        },
    },
});
