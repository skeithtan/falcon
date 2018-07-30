import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import IncompatibleIcon from "@material-ui/icons/Error";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { CompatibilityDisplay } from "../CompatibilityDisplay";
import { UserChip } from "../../../../components/UserChip";
import { findDOMNode } from "react-dom";
import { wrap } from "./wrapper";
import { computeCompatibilityWorker } from "../../../../workers/compute_compatibility.worker";

class BaseClassScheduleItem extends Component {
    state = {
        coordinates: null,
        isCompatibleWithAssignedFaculty: null,
        compatibilityWithHovering: null,
        isCompatibleWithHovering: null,
    };

    componentDidMount() {
        // There are no actual prevProps when mounted, so pass a dummy
        this.calculateCompatibilityWithAssignedFaculty({
            faculty: null,
            classSchedule: null,
            termSchedule: null,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.calculateCoordinates(prevState);
        this.calculateCompatibilityWithHovering(prevProps);
        this.calculateCompatibilityWithAssignedFaculty(prevProps);
    }

    calculateCompatibilityWithAssignedFaculty = prevProps => {
        const { faculty: prevFaculty } = prevProps;
        const { faculty, classSchedule, termSchedule } = this.props;

        const { isCompatibleWithAssignedFaculty: isCompatible } = this.state;

        if (!faculty) {
            if (isCompatible !== null) {
                this.setState({
                    isCompatibleWithAssignedFaculty: null,
                });
            }

            // Return because there's no compatibility to calculate if there's no faculty
            return;
        }

        if (
            prevFaculty &&
            prevFaculty._id === faculty._id &&
            isCompatible !== null
        ) {
            return;
        }

        if (this.assignedWorker) {
            this.assignedWorker.terminate();
        }

        const worker = new Worker(computeCompatibilityWorker);
        this.assignedWorker = worker;

        const response = termSchedule.facultyPool.find(
            response => response.faculty === faculty._id
        );

        worker.postMessage({
            faculty,
            classSchedule,
            availability: response.availability,
            termSchedule,
        });

        worker.addEventListener("message", ({ data: { isCompatible } }) => {
            this.setState({
                isCompatibleWithAssignedFaculty: isCompatible,
            });

            worker.terminate();
            this.assignedWorker = undefined;
        });
    };

    componentWillUnmount() {
        if (this.hoveringWorker) {
            this.hoveringWorker.terminate();
        }

        if (this.assignedWorker) {
            this.assignedWorker.terminate();
        }
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

        if (!faculty) {
            if (compatibility !== null) {
                this.setState({
                    compatibilityWithHovering: null,
                    isCompatibleWithHovering: null,
                });
            }

            // Return because there's no compatibility to calculate if there's no faculty
            return;
        }

        // No need to recalculate if the hovering faculty did not change
        if (previousHoveringFaculty === faculty) {
            return;
        }

        if (this.hoveringWorker) {
            this.hoveringWorker.terminate();
        }

        const worker = new Worker(computeCompatibilityWorker);
        this.hoveringWorker = worker;

        worker.postMessage({
            faculty,
            classSchedule,
            availability,
            termSchedule,
        });

        worker.addEventListener(
            "message",
            ({ data: { compatibility, isCompatible } }) => {
                this.setState({
                    compatibilityWithHovering: compatibility,
                    isCompatibleWithHovering: isCompatible,
                });

                worker.terminate();
                this.assignedWorker = undefined;
            }
        );
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
            classes,
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
                classes={{ paper: classes.compatibilityPopoverPaper }}
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
        const { isCompatibleWithAssignedFaculty: isCompatible } = this.state;

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

                {isCompatible === false && (
                    <Grid item>
                        <IncompatibleIcon color="error" />
                    </Grid>
                )}

                {isCompatible === null && (
                    <Grid item>
                        <CircularProgress size={25} />
                    </Grid>
                )}
            </Grid>
        );
    };

    render() {
        const {
            compatibilityWithHovering,
            isCompatibleWithHovering,
        } = this.state;

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
            containerClasses.push(
                isCompatibleWithHovering
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
