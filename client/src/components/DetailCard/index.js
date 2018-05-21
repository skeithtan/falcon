import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import DetailCard from "./DetailCard";
import styles from "./styles";


export default compose(
    withStyles(styles),
)(DetailCard);