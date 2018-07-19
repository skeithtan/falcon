import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import { UserChip } from "../../../../components/UserChip";
import { ClassSchedulePopover } from "../ClassSchedulePopover";
import { CompatibilityDisplay } from "../CompatibilityDisplay";
import { wrap } from "./wrapper";
import { computeFacultyClassCompatibility } from "../../../../utils/faculty_loading.util";

class BaseClassScheduleItem extends Component {
    state = {
        classSchedulePopoverAnchorEl: null,
        coordinates: null,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const coordinates = findDOMNode(this.gridRef).getBoundingClientRect();

        if (!coordinates) {
            return;
        }

        const prevStateHasCoordinates = prevState.coordinates !== null;

        if (!this.state.coordinates || !prevStateHasCoordinates) {
            this.setState({ coordinates });

            return;
        }

        const coordinatesChanged =
            coordinates.x !== prevState.coordinates.x ||
            coordinates.y !== prevState.coordinates.y;

        if (coordinatesChanged) {
            this.setState({ coordinates });
        }
    }

    handleClassSchedulePopoverOpen = event =>
        this.setState({
            classSchedulePopoverAnchorEl: event.currentTarget,
        });

    handleClassSchedulePopoverClose = () =>
        this.setState({
            classSchedulePopoverAnchorEl: null,
        });

    handleCompatibilityDisplayOpen = event => {
        const { isOver } = this.props;
        if (isOver)
            this.setState({
                compatibilityDisplayAnchorEl: event.currentTarget,
            });
    };

    handleCompatibilityDisplayClose = () => {
        console.log("Close");
        this.setState({
            compatibilityDisplayAnchorEl: null,
        });
    };

    renderClassSchedulePopover = () => {
        const { classSchedulePopoverAnchorEl } = this.state;
        const { classSchedule, faculty, subject, termSchedule } = this.props;
        const compatibility = this.compatibilityWithAssignedFaculty;

        return (
            <ClassSchedulePopover
                open={Boolean(classSchedulePopoverAnchorEl)}
                anchorEl={classSchedulePopoverAnchorEl}
                onClose={this.handleClassSchedulePopoverClose}
                classSchedule={classSchedule}
                faculty={faculty}
                subject={subject}
                termSchedule={termSchedule}
                compatibility={compatibility}
            />
        );
    };

    get compatibilityWithAssignedFaculty() {
        const {
            faculty,
            classSchedule,
            termSchedule,
        } = this.props;

        if (!faculty) {
            return null;
        }

        const assignedClasses = termSchedule.classes.filter(
            item => item.faculty === faculty._id
        );

        const response = termSchedule.facultyPool.find(response => response.faculty === faculty._id);

        return computeFacultyClassCompatibility(
            faculty,
            assignedClasses,
            classSchedule,
            response.availability
        );
    };

    renderCompatibilityPopover = () => {
        const {
            classSchedule,
            termSchedule,
            hovering: { faculty, availability },
            isOver,
        } = this.props;

        const { coordinates } = this.state;

        if (!faculty || !coordinates) {
            return null;
        }

        const assignedClasses = termSchedule.classes.filter(
            item => item.faculty === faculty._id
        );

        const compatibility = computeFacultyClassCompatibility(
            faculty,
            assignedClasses,
            classSchedule,
            availability
        );

        const anchorPosition = {
            left: coordinates.x - 16, // Offset to box
            top: coordinates.y,
        };

        const transformOrigin = {
            vertical: "top",
            horizontal: "right",
        };

        return (
            <Popover
                open={isOver}
                anchorPosition={anchorPosition}
                anchorReference="anchorPosition"
                style={{ pointerEvents: "none" }}
                transformOrigin={transformOrigin}
                disableRestoreFocus
            >
                <CompatibilityDisplay compatibility={compatibility} />
            </Popover>
        );
    };

    render() {
        const { classSchedulePopoverAnchorEl } = this.state;
        const {
            classSchedule,
            faculty,
            subject,
            classes,
            connectDropTarget,
            isOver,
        } = this.props;

        let containerClasses = [classes.classScheduleItemContainer];
        containerClasses.push(
            faculty
                ? classes.classScheduleWithFaculty
                : classes.classScheduleWithoutFaculty
        );

        if (classSchedulePopoverAnchorEl) {
            containerClasses.push("selected");
        }

        if (isOver) {
            containerClasses.push("hoveringFaculty");
        }

        return connectDropTarget(
            <div className={containerClasses.join(" ")}>
                <Grid
                    container
                    spacing={16}
                    ref={ref => (this.gridRef = ref)}
                    onClick={this.handleClassSchedulePopoverOpen}
                >
                    <Grid item>
                        <Typography variant="body2" color="inherit">
                            {subject.code} {classSchedule.section}
                        </Typography>
                        <Typography color="inherit">
                            {classSchedule.room}
                        </Typography>
                    </Grid>
                    {faculty && (
                        <Grid item zeroMinWidth>
                            <UserChip user={faculty.user} />
                        </Grid>
                    )}
                </Grid>

                {this.renderClassSchedulePopover()}
                {this.renderCompatibilityPopover()}
            </div>
        );
    }
}

export const ClassScheduleItem = wrap(BaseClassScheduleItem);
