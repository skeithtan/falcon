import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { compileNotificationsFromState } from "../compile_notifications";
import { styles } from "./styles";


const mapStateToProps = state => ({
    changeRequests: state.changeRequests,
    notifications: compileNotificationsFromState(state),
});

export const wrap = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
);