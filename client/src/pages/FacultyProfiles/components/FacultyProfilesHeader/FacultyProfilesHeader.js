import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Search from "@material-ui/icons/Search";
import React, { Component } from "react";
import { TABS } from "../faculty_detail_tabs";


class FacultyProfilesHeader extends Component {
    renderTabs = () => (
        TABS.map(tab =>
            <Tab key={tab.identifier} label={tab.name} onClick={() => this.props.onTabClick(tab)} />,
        )
    );

    render() {
        const {classes, searchKeyword, onSearchInputChange, activeFacultyId, activeTabIdentifier} = this.props;
        const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTabIdentifier);
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
                                       <Search />
                                   </InputAdornment>
                               }
                               placeholder="Search faculties" />
                    </Paper>
                </div>

                {activeFacultyId &&
                <Tabs value={activeTabIndex}
                      classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
                      scrollable>
                    {this.renderTabs()}
                </Tabs>
                }
            </div>
        );
    }
}

export default FacultyProfilesHeader;
