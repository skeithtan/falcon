import { connect } from "react-redux";
import compose from "recompose/compose";
import UserForm from "./UserForm";


function mapStateToProps(state) {
    return {
        faculties: state.facultyProfiles.faculties,
    };
}

export default compose(
    connect(mapStateToProps, null),
)(UserForm);