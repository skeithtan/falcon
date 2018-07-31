import { page, pageContainer } from "../../components/styles";


export const styles = theme => ({
    myProfileContainer: page(theme),
    myProfileBodyContainer: {
        overflowY: "auto",
        flex: 1,
    },
    stateContainer: {
        ...pageContainer(theme),
    },
});