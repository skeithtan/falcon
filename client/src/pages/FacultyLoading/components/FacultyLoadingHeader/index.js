import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { makeURL } from "../../../../utils/url.util";
import { wrap } from "./wrapper";

class BaseFacultyLoadingHeader extends Component {
    renderTermScheduleSelect = () => {
        const {
            termSchedules: { archived, current },
            activeTermSchedule,
            classes,
        } = this.props;
        const termSchedules = [...archived];

        if (current) {
            termSchedules.push(current);
        }

        return (
            <div className={classes.termSchedulesSelectWrapper}>
                <Paper className={classes.termSchedulesPaper}>
                    <Select
                        className={classes.termSchedulesSelect}
                        value={activeTermSchedule._id}
                    >
                        {termSchedules.map(
                            termSchedule => (
                                <MenuItem
                                    key={termSchedule._id}
                                    value={termSchedule._id}
                                    component={Link}
                                    to={makeURL()
                                        .facultyLoading()
                                        .selectTermSchedule(termSchedule._id)
                                        .mondayThursday()
                                        .build()}
                                >
                                    {termScheduleToString(termSchedule)}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </Paper>
            </div>
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.facultyLoadingHeader}>
                {this.renderTermScheduleSelect()}
            </div>
        );
    }
}

export const FacultyLoadingHeader = wrap(BaseFacultyLoadingHeader);
