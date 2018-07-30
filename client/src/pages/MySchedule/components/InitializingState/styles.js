import { pageContainer } from "../../../../components/styles";

export const styles = theme => ({
    initializingStateContainer: {
        height: "100%",
    },
    messageContainer: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    
    cardsContainer: pageContainer(theme)
});
