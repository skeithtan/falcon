import { connect } from "react-redux";
import compose from "recompose/compose";
import { UserForm as Component } from "./UserForm";


function mapStateToProps(state) {
    return {
        faculties: state.faculty.faculties,
    };
}

export const UserForm = compose(
    connect(mapStateToProps, null),
)(Component);