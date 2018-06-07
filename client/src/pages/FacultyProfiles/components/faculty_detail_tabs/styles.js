import { pageContainer } from "../../../../components/styles";


export const styles = theme => ({
    cardsContainer: {
        ...pageContainer(theme),
        gridRowGap: `${theme.spacing.unit * 3}px`,
    },
    expansionCardsContainer: {
        ...pageContainer(theme),
    },
});