import { page, pageContainer } from "../../components/styles";


export const styles = theme => ({
    myProfileContainer: page(theme),
    myProfileBodyContainer: {
        overflowY: "scroll",
        flex: 1,
    },
    stateContainer: {
        ...pageContainer(theme),
    },
});