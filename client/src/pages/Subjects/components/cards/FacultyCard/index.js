import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchAllFaculties } from "../../../../../utils/faculty.util";
import { FacultyCard as Component } from "./FacultyCard";


const mapStateToProps = state => ({
    ...state.faculty,
    user: state.authentication.user
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        fetchAllFaculties(dispatch);
    },
});

export const FacultyCard = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Component);