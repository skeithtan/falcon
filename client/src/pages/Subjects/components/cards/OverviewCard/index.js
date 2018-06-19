import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { OverviewCard as Component } from "./OverviewCard";
import { styles } from "./styles";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const OverviewCard = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);