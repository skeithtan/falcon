import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { meetingDaysFromPath } from "../../../../../utils/faculty_loading.util";
import { ScheduleCalendar } from "../../ScheduleCalendar";
import Divider from "@material-ui/core/Divider";

export class ScheduleCard extends PureComponent {
    render() {
        const { activeTermSchedule, meetingDays: meetingDaysPath } = this.props;
        const meetingDays = meetingDaysFromPath(meetingDaysPath);

        return (
            <Card>
                <Toolbar>
                    <Typography variant="title">{meetingDays.name}</Typography>
                </Toolbar>
                <Divider />
                <ScheduleCalendar />
            </Card>
        );
    }
}
