import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { Component } from "react";
import { TABS } from "../tabs";


export default class FacultyLoadingHeader extends Component {
    renderTabs = () => TABS.map(tab =>
        <Tab key={tab.identifier} label={tab.name} onClick={() => this.props.history.push(tab.path)} />,
    );

    render() {
        const {classes, activeTabIdentifier} = this.props;
        const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTabIdentifier);
        return (
            <div className={classes.header}>
                <Tabs
                    value={activeTabIndex}
                    classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
                >
                    {this.renderTabs()}
                </Tabs>
            </div>
        );
    }
}