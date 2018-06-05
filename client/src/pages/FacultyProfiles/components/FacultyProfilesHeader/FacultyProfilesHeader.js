import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { FACULTY_PROFILES_PAGE } from "../../../index";
import { TABS } from "../faculty_detail_tabs";


const FacultyProfilesTabs = ({facultyId, history}) => TABS.map(tab => (
    <Tab
        key={tab.identifier}
        label={tab.name}
        onClick={() => history.push(`/${FACULTY_PROFILES_PAGE.path}/${facultyId}/${tab.path}`)}
    />
));

export const FacultyProfilesHeader = ({
    match,
    classes,
    history,
    searchKeyword,
    onSearchInputChange,
}) => {
    const activeFacultyId = match.params.facultyId;
    const activeTabIndex = TABS.findIndex(tab => tab.path === match.params.activeTab);

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
            <Tabs value={activeTabIndex}
                  classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
                  scrollable>
                <FacultyProfilesTabs facultyId={activeFacultyId} history={history} />
            </Tabs>
            }
        </div>
    );
};

