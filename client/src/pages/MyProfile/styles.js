import { page } from "../../components/styles";
import {pageContainer} from "../../components/styles";


export const styles = theme => ({
    myProfileContainer: page(theme),
    myProfileBodyContainer: {
        overflowY: "scroll",
    },
    stateContainer: {
        ...pageContainer(theme)
    }
});