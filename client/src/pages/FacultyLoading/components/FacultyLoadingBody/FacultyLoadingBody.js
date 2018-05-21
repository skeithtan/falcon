import React, { Component, createElement } from "react";
import { FACULTY_LOADING_PAGE } from "../../../index";
import { getTabFromPath } from "../tabs";


export default class FacultyLoadingBody extends Component {
    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        const {activeTab, onTabChange, match, history} = nextProps;
        const currentPath = match.params.activeTab;

        function redirect(path) {
            history.push(`/${FACULTY_LOADING_PAGE.path}/${path}`);
        }

        if (!currentPath) {
            // No current path? Redirect to last active tab from Redux
            redirect(activeTab.path);
            return prevState;
        }

        const currentPathTab = getTabFromPath(currentPath);
        if (!currentPathTab) {
            redirect(activeTab.path);
            return prevState;
        }

        if (currentPathTab.identifier !== activeTab.identifier) {
            onTabChange(currentPathTab);
        }

        return prevState;
    }

    render() {
        return createElement(this.props.activeTab.component);
    }

}