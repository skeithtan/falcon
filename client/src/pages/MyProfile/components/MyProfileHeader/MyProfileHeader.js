import React from "react";
import { TABS} from "../../../FacultyProfiles/components/faculty_detail_tabs";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const renderMyProfileTabs = ({history}) => TABS.map(({identifier, name, path}) => (
    <Tab key={identifier} label={name} onClick={() => history.push(path)} />
));

export const MyProfileHeader = ({classes, activeTabIdentifier, history}) => {
    const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTabIdentifier);
    return (
        <div className={classes.header}>
            <Tabs
                value={activeTabIndex}
                classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
            >
                {renderMyProfileTabs({history})}
            </Tabs>
        </div>
    );
};
