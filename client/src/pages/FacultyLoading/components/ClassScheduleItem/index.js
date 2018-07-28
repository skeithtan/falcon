import React, { Component } from "react";
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
        coordinates: null,
        compatibilityWithHovering: null,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.calculateCoordinates(prevState);
        this.calculateCompatibilityWithHovering(prevProps);
    }

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

    calculateCompatibilityWithHovering = prevProps => {
        const {
            hovering: { faculty: previousHoveringFaculty },
        } = prevProps;

        const {
            classSchedule,
            termSchedule,
            hovering: { faculty, availability },
        } = this.props;

        const { compatibilityWithHovering: compatibility } = this.state;

        if (!faculty && compatibility !== null) {
            this.setState({
                compatibilityWithHovering: null,
            });
            return;
        }

        // No need to recalculate if the hovering faculty did not change
        if (previousHoveringFaculty === faculty) {
            return;
        }

        const assignedClasses = termSchedule.classes.filter(
            item => item.faculty === faculty._id
        );

        this.setState({
            compatibilityWithHovering: computeFacultyClassCompatibility(
                faculty,
                assignedClasses,
                classSchedule,
                availability
            ),
        });
    };

    calculateCoordinates = prevState => {
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
    };

    handleclassSchedulePopperOpen = event => {
        const { setActiveClassSchedule, classSchedule } = this.props;
        setActiveClassSchedule(classSchedule._id, event.currentTarget);
    };

    handleCompatibilityDisplayOpen = event => {
        const { isOver } = this.props;
        if (isOver)
            this.setState({
                compatibilityDisplayAnchorEl: event.currentTarget,
            });
    };

    handleCompatibilityDisplayClose = () =>
        this.setState({
            compatibilityDisplayAnchorEl: null,
        });

    renderCompatibilityPopover = () => {
        const {
            hovering: { faculty },
            isOver,
        } = this.props;

        const { coordinates, compatibilityWithHovering } = this.state;

        if (
            !faculty ||
            !coordinates ||
            !isOver ||
            compatibilityWithHovering === null
        ) {
            return null;
        }

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
                <CompatibilityDisplay
                    compatibility={compatibilityWithHovering}
                />
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
        const { compatibilityWithHovering } = this.state;
        const {
            active,
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

        if (active) {
            containerClasses.push("selected");
        }

        if (isOver) {
            containerClasses.push("hoveringFaculty");
        }

        if (compatibilityWithHovering !== null) {
            const compatible = compatibilityWithHovering.every(
                item => item.isCompatible
            );
            containerClasses.push(
                compatible
                    ? "compatibleWithHovering"
                    : "incompatibleWithHovering"
            );
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

                {this.renderCompatibilityPopover()}
            </div>
        );
    }
}

export const ClassScheduleItem = wrap(BaseClassScheduleItem);
