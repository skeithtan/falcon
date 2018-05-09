import React, { Component, createElement } from "react";
import Typography from "material-ui/Typography";
import SwipeableViews from "react-swipeable-views";
import { TABS } from "../faculty_detail_tabs";

export default class FacultyDetail extends Component {
    emptyState = () => (
        <div className={this.props.classes.emptyState}>
            <Typography variant="headline" className={this.props.classes.emptyStateText}>
                Select a faculty from the left to see the details
            </Typography>
        </div>
    );

    renderTabs = () => {
        const {activeTab, classes, onTabChange} = this.props;

        const tabComponents = TABS.map(tab => createElement(tab.component, null));
        const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTab.identifier);

        function handleChangeIndex(newIndex) {
            onTabChange(TABS[newIndex]);
        }

        return (
            <div className={classes.facultyDetail}>
                <SwipeableViews index={activeTabIndex} onChangeIndex={handleChangeIndex}>
                    {tabComponents}
                </SwipeableViews>
            </div>
        );
    };

    render() {
        return this.props.activeFacultyId ? this.renderTabs() : this.emptyState();
    }
}

