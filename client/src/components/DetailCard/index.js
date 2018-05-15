import { withStyles, withTheme } from "@material-ui/core/styles";
import { compose } from "recompose";
import DetailCard from "./DetailCard";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(DetailCard);