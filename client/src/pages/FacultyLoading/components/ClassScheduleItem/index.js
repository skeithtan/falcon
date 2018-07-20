import React, { Component } from "react";

import { ClassSchedulePopper } from "../ClassSchedulePopper";
import { CompatibilityDisplay } from "../CompatibilityDisplay";
import Grid from "@material-ui/core/Grid";
import IncompatibleIcon from "@material-ui/icons/Error";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { UserChip } from "../../../../components/UserChip";
import { computeFacultyClassCompatibility } from "../../../../utils/faculty_loading.util";
import { findDOMNode } from "react-dom";
import { wrap } from "./wrapper";

class BaseClassScheduleItem extends Component {
    state = {
        classSchedulePopperAnchorEl: null,
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

    handleclassSchedulePopperOpen = event =>
        this.setState({
            classSchedulePopperAnchorEl: event.currentTarget,
        });

    handleclassSchedulePopperClose = () =>
        this.setState({
            classSchedulePopperAnchorEl: null,
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

    renderclassSchedulePopper = () => {
        const { classSchedulePopperAnchorEl } = this.state;
        const { classSchedule, faculty, subject, termSchedule } = this.props;
        const compatibility = this.compatibilityWithAssignedFaculty;

        return (
            <ClassSchedulePopper
                open={Boolean(classSchedulePopperAnchorEl)}
                anchorEl={classSchedulePopperAnchorEl}
                onClose={this.handleclassSchedulePopperClose}
                classSchedule={classSchedule}
                faculty={faculty}
                subject={subject}
                termSchedule={termSchedule}
                compatibility={compatibility}
            />
        );
    };

    get compatibilityWithAssignedFaculty() {
        const { faculty, classSchedule, termSchedule } = this.props;

        if (!faculty) {
            return null;
        }

        const assignedClasses = termSchedule.classes.filter(
            item => item.faculty === faculty._id
        );

        const response = termSchedule.facultyPool.find(
            response => response.faculty === faculty._id
        );

        return computeFacultyClassCompatibility(
            faculty,
            assignedClasses,
            classSchedule,
            response.availability
        );
    }

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

    renderFacultyChip = () => {
        const { faculty } = this.props;

        const compatibility = this.compatibilityWithAssignedFaculty;
        const isCompatible =
            compatibility !== null &&
            compatibility.every(item => item.isCompatible);

        return (
            <Grid
                container
                spacing={8}
                direction="row"
                wrap="nowrap"
                alignItems="center"
                justify="space-between"
            >
                <Grid item xs zeroMinWidth>
                    <UserChip user={faculty.user} />
                </Grid>

                {!isCompatible && (
                    <Grid item>
                        <IncompatibleIcon color="error" />
                    </Grid>
                )}
            </Grid>
        );
    };

    render() {
        const { classSchedulePopperAnchorEl } = this.state;
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

        if (classSchedulePopperAnchorEl) {
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
                    direction="column"
                    ref={ref => (this.gridRef = ref)}
                    onClick={this.handleclassSchedulePopperOpen}
                    wrap="nowrap"
                >
                    <Grid item>
                        <Typography variant="body2" color="inherit">
                            {subject.code} {classSchedule.section}
                        </Typography>
                        <Typography color="inherit">
                            {classSchedule.room}
                        </Typography>
                    </Grid>

                    {faculty !== null && (
                        <Grid item>{this.renderFacultyChip()}</Grid>
                    )}
                </Grid>

                {this.renderclassSchedulePopper()}
                {this.renderCompatibilityPopover()}
            </div>
        );
    }
}

export const ClassScheduleItem = wrap(BaseClassScheduleItem);