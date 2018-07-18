import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import { UserChip } from "../../../../components/UserChip";
import { ClassSchedulePopover } from "../ClassSchedulePopover";
import { CompatibilityDisplay } from "../CompatibilityDisplay";
import { wrap } from "./wrapper";

class CompatibilityPopover extends Component {
    render() {
        const {
            open,
            anchorPosition,
            faculty,
            assignedClasses,
            classSchedule,
            availability,
        } = this.props;

        return (
            <Popover
                open={open}
                anchorPosition={anchorPosition}
                anchorReference="anchorPosition"
                style={{ pointerEvents: "none" }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                disableRestoreFocus
            >
                <CompatibilityDisplay
                    faculty={faculty}
                    assignedClasses={assignedClasses}
                    classSchedule={classSchedule}
                    availability={availability}
                />
            </Popover>
        );
    }
}

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

        return (
            <ClassSchedulePopover
                open={Boolean(classSchedulePopoverAnchorEl)}
                anchorEl={classSchedulePopoverAnchorEl}
                onClose={this.handleClassSchedulePopoverClose}
                classSchedule={classSchedule}
                faculty={faculty}
                subject={subject}
                termSchedule={termSchedule}
            />
        );
    };

    renderCompatibilityPopover = () => {
        const {
            classSchedule,
            subject,
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

        return (
            <CompatibilityPopover
                open={isOver}
                anchorPosition={{
                    left: coordinates.x - 16, // Offset to box
                    top: coordinates.y,
                }}
                faculty={faculty}
                subject={subject}
                availability={availability}
                assignedClasses={assignedClasses}
                classSchedule={classSchedule}
            />
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
