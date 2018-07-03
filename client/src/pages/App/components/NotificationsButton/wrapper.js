import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { styles } from "./styles";


const mapStateToProps = state => ({
    changeRequests: state.changeRequests,
});

export const wrap = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
);