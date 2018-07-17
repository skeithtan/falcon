import { page, pageContainer } from "../../components/styles";

export const styles = theme => ({
    myScheduleContainer: {
        height: "100%",
        overflowY: "scroll",
    },
    cardsContainer: {
        ...pageContainer(theme),
    },
});
