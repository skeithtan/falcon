import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import styles from "./styles";
import UpdateFacultyOverviewModal from "./UpdateFacultyOverviewModal";


function mapStateToProps(state) {
    return {
        faculties: state.facultyProfiles.faculties,
    };
}

export default compose(
    connect(mapStateToProps, null),
    withTheme(),
    withStyles(styles),
)(UpdateFacultyOverviewModal);