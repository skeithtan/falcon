import { connect } from "react-redux";
import compose from "recompose/compose";
import { RecognitionsCard as Component } from "./RecognitionsCard";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const RecognitionsCard = compose(
    connect(mapStateToProps, null),
)(Component);