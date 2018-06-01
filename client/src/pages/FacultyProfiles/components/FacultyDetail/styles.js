import { pageContainer } from "../../../../components/styles";


export const styles = theme => ({
    facultyDetail: {
        overflowY: "scroll",
    },
    selectFacultyState: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    selectFacultyText: {
        color: theme.palette.grey["600"],
    },
    cardsContainer: {
        ...pageContainer(theme),
        gridRowGap: `${theme.spacing.unit * 3}px`,
    },
    expansionCardsContainer: {
        ...pageContainer(theme),
    },
});