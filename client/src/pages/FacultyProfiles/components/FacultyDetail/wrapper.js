import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../redux/actions/faculty.actions";
import { fetchFacultyDetails } from "../../../../services/faculty/faculty";
import { getTabFromIdentifier } from "../faculty_detail_tabs";
import { styles } from "./styles";


const mapStateToProps = state => ({
    activeTab: getTabFromIdentifier(state.facultyProfiles.activeTabIdentifier),
    faculty: state.faculty,
    ...state.facultyProfiles.facultyDetails,
});

const mapDispatchToProps = dispatch => ({
    getFacultyDetails(faculty) {
        return fetchFacultyDetails(faculty._id)
            .then(result => result.data.faculty)
            .then(newFaculty => dispatch(facultyIsUpdated({
                ...faculty,
                ...newFaculty,
            })))
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);