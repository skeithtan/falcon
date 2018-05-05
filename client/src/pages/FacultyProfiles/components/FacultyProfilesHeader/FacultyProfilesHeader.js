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
                    <Paper>
                        <Input className={classes.searchInput}
                               fullWidth
                               type="search"
                               placeholder="Search faculties" />
                    </Paper>
                </div>

                <div>
                    <Tabs value={0}
                          classes={{indicator: classes.tabsIndicator}}
                          scrollable>
                        <Tab classes={{selected: classes.tabSelected}}
                             label="Overview" />
                        <Tab classes={{selected: classes.tabSelected}}
                             label="Presentations" />
                        <Tab classes={{selected: classes.tabSelected}}
                             label="Recognitions" />
                        <Tab classes={{selected: classes.tabSelected}}
                             label="Instructional Materials" />
                        <Tab classes={{selected: classes.tabSelected}}
                             label="Extension Works" />
                        <Tab classes={{selected: classes.tabSelected}}
                             label="Teaching Subjects" />
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default FacultyProfilesHeader;
