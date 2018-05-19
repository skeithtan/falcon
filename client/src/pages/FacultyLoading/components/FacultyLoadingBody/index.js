import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyLoadingActiveTabChanged } from "../../../../actions/faculty_loading.actions";
import { getTabFromIdentifier } from "../tabs";
import FacultyLoadingBody from "./FacultyLoadingBody";


function mapStateToProps(state) {
    return {
        activeTab: getTabFromIdentifier(state.facultyLoading.activeTabIdentifier),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTabChange(tab) {
            dispatch(facultyLoadingActiveTabChanged(tab));
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(FacultyLoadingBody);