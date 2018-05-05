import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Input from "material-ui/Input";
import Tabs, { Tab } from "material-ui/Tabs";


class FacultyProfilesHeader extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={`${classes.facultyProfilesHeader} ${classes.split}`}>
                <div className={classes.searchWrapper}>
                    <Paper className={classes.searchPaper}>
                        <Input className={classes.searchInput}
                               fullWidth
                               type="search"
                               placeholder="Search faculties" />
                    </Paper>
                </div>

                <Tabs value={0}
                      classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
                      scrollable>
                    <Tab label="Overview" />
                    <Tab label="Presentations" />
                    <Tab label="Recognitions" />
                    <Tab label="Instructional Materials" />
                    <Tab label="Extension Works" />
                    <Tab label="Teaching Subjects" />
                </Tabs>
            </div>
        );
    }
}

export default FacultyProfilesHeader;
