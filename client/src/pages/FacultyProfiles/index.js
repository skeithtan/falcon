import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { fetchAllFaculties } from "../../utils/faculty.util";
import { FacultyProfilesPage as Component } from "./FacultyProfiles";
import { styles } from "./styles";


function mapStateToProps(state) {
    return {
        ...state.faculty,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            fetchAllFaculties(dispatch);
        },
    }
}

export const FacultyProfilesPage = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
)(Component);