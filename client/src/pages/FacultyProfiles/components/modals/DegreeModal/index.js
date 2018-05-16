import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import styles from "./styles";
import DegreeModal from "./DegreeModal";


export default compose(
    connect(null, null), //TODO
    withTheme(),
    withStyles(styles),
)(DegreeModal);