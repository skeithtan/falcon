import Badge from "@material-ui/core/Badge";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SearchIcon from "@material-ui/icons/Search";
import React, { PureComponent } from "react";
import { FACULTY_PROFILES_PAGE } from "../../..";
import { CHANGE_REQUESTS_TAB, TABS } from "../faculty_detail_tabs";
import { wrap } from "./wrapper";


class BaseFacultyProfilesHeader extends PureComponent {
    renderTabLabel = (tab, badge, classes) => {
        if (badge && badge > 0 && tab.identifier === CHANGE_REQUESTS_TAB.identifier) {
            return (
                <Badge color="error" badgeContent={badge}
                       classes={{root: classes.badgeContainer, badge: classes.badge}}>
                    {tab.name}
                </Badge>
            );
        }

        return tab.name;
    };

    render() {
        const {
            facultyId,
            activeTabPath,
            classes,
            history,
            searchKeyword,
            changeRequests: {
                changeRequests: allChangeRequests,
            },
            onSearchInputChange,
        } = this.props;

        const activeTabIndex = TABS.findIndex(tab => tab.path === activeTabPath);

        const badge = allChangeRequests &&
            allChangeRequests[facultyId] &&
            allChangeRequests[facultyId].length;

        const tabsClasses = {
            root: classes.tabs,
            indicator: classes.tabsIndicator,
            flexContainer: classes.tabsFlexContainer,
        };

        return (
            <div className={`${classes.facultyProfilesHeader} ${classes.split}`}>
                <div className={classes.searchWrapper}>
                    <Paper className={classes.searchPaper}>
                        <Input
                            className={classes.searchInput}
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

                {facultyId &&
                <Tabs
                    value={activeTabIndex}
                    classes={tabsClasses}
                    scrollable
                >
                    {TABS.map(tab => (
                        <Tab
                            key={tab.identifier}
                            label={this.renderTabLabel(tab, badge, classes)}
                            onClick={() => history.push(`/${FACULTY_PROFILES_PAGE.path}/${facultyId}/${tab.path}`)}
                        />
                    ))}
                </Tabs>
                }
            </div>
        );
    }
}

export const FacultyProfilesHeader = wrap(BaseFacultyProfilesHeader);