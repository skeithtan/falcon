import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyLoadingActiveTabChanged } from "../../../../actions/faculty_loading.actions";
import { getTabFromIdentifier } from "../../tabs";
import { FacultyLoadingBody as Component } from "./FacultyLoadingBody";


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

export const FacultyLoadingBody = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Component);