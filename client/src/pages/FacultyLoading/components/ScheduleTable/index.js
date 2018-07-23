import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { MEETING_DAYS, MEETING_HOURS } from "../../../../enums/class.enums";
import { getFullName } from "../../../../utils/user.util";

class ScheduleRow extends PureComponent {
    renderFaculty = () => {
        const { faculty } = this.props;
        if (!faculty) {
            return (
                <Typography color="textSecondary">
                    <i>No assigned faculty</i>
                </Typography>
            );
        }

        return getFullName(faculty.user);
    };

    render() {
        const { classSchedule, subject } = this.props;
        return (
            <TableRow>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{classSchedule.section}</TableCell>
                <TableCell>{classSchedule.course}</TableCell>
                <TableCell>
                    {MEETING_DAYS[classSchedule.meetingDays].shortName}
                </TableCell>
                <TableCell>
                    {MEETING_HOURS[classSchedule.meetingHours].name}
                </TableCell>
                <TableCell>{classSchedule.room}</TableCell>
                <TableCell>{this.renderFaculty()}</TableCell>
            </TableRow>
        );
    }
}

export class ScheduleTable extends PureComponent {
    render() {
        const { termSchedule, faculties, subjects } = this.props;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Section</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Days</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Room</TableCell>
                        <TableCell>Faculty</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {termSchedule.classes.map(classSchedule => (
                        <ScheduleRow
                            key={classSchedule._id}
                            classSchedule={classSchedule}
                            faculty={faculties.find(
                                faculty => faculty._id === classSchedule.faculty
                            )}
                            subject={subjects.find(
                                subject => subject._id === classSchedule.subject
                            )}
                        />
                    ))}
                </TableBody>
            </Table>
        );
    }
}
