import { pageContainer } from "../../../../components/styles";


export const styles = theme => ({
    subjectsDetail: {
        overflowY: "auto",
    },
    selectSubjectState: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    selectSubjectText: {
        color: theme.palette.grey["600"],
    },
    cardsContainer: {
        ...pageContainer(theme),
        gridRowGap: `${theme.spacing.unit * 3}px`,
    },
});