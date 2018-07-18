import { pageContainer } from "../../../../components/styles";

export const styles = theme => ({
    facultyLoadingBody: {
        flexGrow: 1,
        height: "100%",
        minHeight: 0,
        overflowY: "scroll",
    },
    cardsContainer: {
        ...pageContainer(theme),
        maxWidth: 1600,
        height: "100%",
    },
    floatingActionButton: {
        position: "fixed",
        bottom: 40,
        right: 40,
    },
    scheduleFacultiesContainer: {
        height: "100%",
    },
});
