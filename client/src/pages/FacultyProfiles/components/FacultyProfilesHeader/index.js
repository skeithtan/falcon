import Badge from "@material-ui/core/Badge";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { FACULTY_PROFILES_PAGE } from "../../../index";
import { CHANGE_REQUESTS_TAB, TABS } from "../faculty_detail_tabs";
import { wrap } from "./wrapper";


const getBadgeNumber = (facultyId, changeRequests) => {
    if (!changeRequests) {
        return null;
    }

    return changeRequests.filter(changeRequest => changeRequest.faculty === facultyId).length;
};

const renderTabLabel = (tab, badge, classes) => {
    if (badge && badge > 0 && tab.identifier === CHANGE_REQUESTS_TAB.identifier) {
        return (
            <Badge color="error" badgeContent={badge} classes={{root: classes.badgeContainer, badge: classes.badge}}>
                {tab.name}
            </Badge>
        );
    }

    return tab.name;
};

const BaseFacultyProfilesHeader = ({
    match,
    classes,
    history,
    searchKeyword,
    changeRequests,
    onSearchInputChange,
}) => {
    const activeFacultyId = match.params.facultyId;
    const activeTabIndex = TABS.findIndex(tab => tab.path === match.params.activeTab);

    const badge = getBadgeNumber(activeFacultyId, changeRequests.changeRequests);

    return (
        <div className={`${classes.facultyProfilesHeader} ${classes.split}`}>
            <div className={classes.searchWrapper}>
                <Paper className={classes.searchPaper}>
                    <Input className={classes.searchInput}
                           fullWidth
                           type="search"
                           value={searchKeyword}
                           onChange={event => onSearchInputChange(event.target.value)}
                           startAdornment={
                               <InputAdornment position="start" className={classes.searchAdornment}>
                                   <SearchIcon />
                               </InputAdornment>
                           }
                           placeholder="Search faculties" />
                </Paper>
            </div>

            {activeFacultyId &&
            <Tabs
                value={activeTabIndex}
                classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
                scrollable
            >
                {TABS.map(tab => (
                    <Tab
                        key={tab.identifier}
                        label={renderTabLabel(tab, badge, classes)}
                        onClick={() => history.push(`/${FACULTY_PROFILES_PAGE.path}/${activeFacultyId}/${tab.path}`)}
                    />
                ))}
            </Tabs>
            }
        </div>
    );
};

export const FacultyProfilesHeader = wrap(BaseFacultyProfilesHeader);