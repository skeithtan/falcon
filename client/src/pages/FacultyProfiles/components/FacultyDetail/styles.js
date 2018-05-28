import { pageContainer } from "../../../../components/styles";


export const styles = theme => ({
    facultyDetail: {
        overflowY: "scroll",

        "& > div": {
            height: "100%",
        },
        "& .react-swipeable-view-container": {
            height: "100%",
        },
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