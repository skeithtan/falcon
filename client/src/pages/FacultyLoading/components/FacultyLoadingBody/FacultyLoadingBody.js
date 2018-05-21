import React, { Component, createElement } from "react";
import SwipeableViews from "react-swipeable-views";
import { FACULTY_LOADING_PAGE } from "../../../index";
import { getTabFromPath, TABS } from "../tabs";


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

    renderTabs = () => TABS.map(tab =>
        createElement(tab.component, {key: tab.identifier}),
    );

    render() {
        const {activeTab, onTabChange} = this.props;
        const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTab.identifier);

        function handleChangeIndex(newIndex) {
            onTabChange(TABS[newIndex]);
        }

        return (
            <SwipeableViews
                index={activeTabIndex}
                onChangeIndex={handleChangeIndex}
                style={{height: "100%"}}
                containerStyle={{height: "100%"}}
            >
                {this.renderTabs()}
            </SwipeableViews>
        );
    }

}