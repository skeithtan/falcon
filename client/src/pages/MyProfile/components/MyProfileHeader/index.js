import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { PureComponent } from "react";
import { TABS } from "../../../FacultyProfiles/components/faculty_detail_tabs";
import { MY_PROFILE_PAGE } from "../../../index";
import { wrap } from "./wrapper";


class BaseMyProfileHeader extends PureComponent {
    renderMyProfileTabs = ({history}) => TABS.map(({identifier, name, path}) => (
        <Tab key={identifier} label={name} onClick={() => history.push(`/${MY_PROFILE_PAGE.path}/${path}`)} />
    ));

    render() {
        const {classes, match, history} = this.props;
        const activeTabIndex = TABS.findIndex(tab => tab.path === match.params.activeTab) || 0;
        return (
            <div className={classes.header}>
                <Tabs
                    value={activeTabIndex}
                    classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
                >
                    {this.renderMyProfileTabs({history})}
                </Tabs>
            </div>
        );
    }
}

export const MyProfileHeader = wrap(BaseMyProfileHeader);