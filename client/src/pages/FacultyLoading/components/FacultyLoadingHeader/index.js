import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyLoadingActiveTabChanged } from "../../../../actions/faculty_loading.actions";
import FacultyLoadingHeader from "./FacultyLoadingHeader";
import styles from "./styles";


function mapStateToProps(state) {
    return {
        activeTabIdentifier: state.facultyLoading.activeTabIdentifier,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTabClick(tab) {
            dispatch(facultyLoadingActiveTabChanged(tab));
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(FacultyLoadingHeader);