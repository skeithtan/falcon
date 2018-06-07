import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyLoadingActiveTabChanged } from "../../../../redux/actions/faculty_loading.actions";
import { getTabFromIdentifier } from "../../tabs";
import { FacultyLoadingBody as Component } from "./FacultyLoadingBody";


const mapStateToProps = state => ({
    activeTab: getTabFromIdentifier(state.facultyLoading.activeTabIdentifier),
});

const mapDispatchToProps = dispatch => ({
    onTabChange(tab) {
        dispatch(facultyLoadingActiveTabChanged(tab));
    },
});

export const FacultyLoadingBody = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Component);