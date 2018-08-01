import { pageContainer } from "../../../../components/styles";

export const styles = theme => ({
    facultyLoadingBody: {
        flexGrow: 1,
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
    },
    cardsContainer: {
        ...pageContainer(theme),
        maxWidth: 1600,
        paddingTop: 24,
        paddingBottom: 24,
        height: "100%",
    },
    floatingActionButton: {
        position: "fixed",
        bottom: 40,
        right: 40,
    },
    scheduleFacultiesContainer: {
        height: "100%",
        display: "grid",
        gridTemplateColumns: "280px auto",
        gridGap: "16px",
    },
    height100: {
        height: "100%",
    },
});
