import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import FacultyDetail from "./FacultyDetail";
import styles from "./styles";

function mapStateToProps(state) {
    return {
        activeFaculty: state.facultyList.activeFaculty,
    };
}

export default compose(
    connect(mapStateToProps, null),
    withTheme(),
    withStyles(styles),
)(FacultyDetail);
