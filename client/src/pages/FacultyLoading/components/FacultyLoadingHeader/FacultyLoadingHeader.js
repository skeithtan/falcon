import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { TABS } from "../../tabs";


const FacultyLoadingHeaderTabs = ({history}) => TABS.map(({identifier, name, path}) => (
    <Tab key={identifier} label={name} onClick={() => history.push(path)} />
));

export const FacultyLoadingHeader = ({classes, activeTabIdentifier, history}) => {
    const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTabIdentifier);
    return (
        <div className={classes.header}>
            <Tabs
                value={activeTabIndex}
                classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
            >
                <FacultyLoadingHeaderTabs history={history} />
            </Tabs>
        </div>
    );
};
