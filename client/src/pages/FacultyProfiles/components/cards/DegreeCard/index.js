import { connect } from "react-redux";
import compose from "recompose/compose";
import { DegreeCard as Component } from "./DegreeCard";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const DegreeCard = compose(
    connect(mapStateToProps, null),
)(Component);