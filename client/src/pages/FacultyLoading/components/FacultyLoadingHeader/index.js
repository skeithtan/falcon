import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MEETING_DAYS } from "../../../../enums/class.enums";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { makeURL } from "../../../../utils/url.util";
import { FACULTY_LOADING_PAGE } from "../../../index";
import { wrap } from "./wrapper";


class BaseFacultyLoadingHeader extends Component {
    renderTermScheduleSelect = () => {
        const {termSchedules, activeTermSchedule, classes} = this.props;
        return (
            <div className={classes.termSchedulesSelectWrapper}>
                <Paper className={classes.termSchedulesPaper}>
                    <Select className={classes.termSchedulesSelect} value={activeTermSchedule._id}>
                        {termSchedules.map(termSchedule => (
                            <MenuItem
                                key={termSchedule._id}
                                value={termSchedule._id}
                                component={Link}
                                to={makeURL().facultyLoading().selectTermSchedule(termSchedule._id).mondayThursday().build()}
                            >
                                {termScheduleToString(termSchedule)}
                            </MenuItem>
                        ))}
                    </Select>
                </Paper>
            </div>
        );
    };

    renderMeetingDaysTabs = () => {
        const {meetingDay, classes, activeTermSchedule, history} = this.props;

        const tabsClasses = {
            root: classes.tabs,
            indicator: classes.tabsIndicator,
            flexContainer: classes.tabsFlexContainer,
        };

        const onTabClick = path => {
            if (path === meetingDay) {
                return;
            }

            history.push(`/${FACULTY_LOADING_PAGE.path}/${activeTermSchedule._id}/${path}`);
        };

        return (
            <Tabs
                value={meetingDay}
                classes={tabsClasses}
                scrollable
            >
                {Object.entries(MEETING_DAYS).map(([key, {name, path}]) => (
                    <Tab
                        key={key}
                        label={name}
                        value={path}
                        onClick={() => onTabClick(path)}
                    />
                ))}
            </Tabs>
        );
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.facultyLoadingHeader}>
                {this.renderTermScheduleSelect()}
                {this.renderMeetingDaysTabs()}
            </div>
        );
    }
}

export const FacultyLoadingHeader = wrap(BaseFacultyLoadingHeader);
