import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import { StatusChip } from "../../../StatusChip";
import { EMPLOYMENT } from "../../../../../../enums/faculty.enums";

const getLoadString = number => (number === 1 ? "load" : "loads");

export class SchedulingInfo extends PureComponent {
    renderChip() {
        const { faculty, assignedClasses, feedback } = this.props;
        const { min, max } = EMPLOYMENT[faculty.employment].load;
        const assignedClassesCount = assignedClasses.length;

        // Is unassigned
        if (assignedClassesCount === 0) {
            return (
                <StatusChip
                    feedback={feedback}
                    color="red"
                    label="Unassigned"
                />
            );
        }

        const isUnderloaded = assignedClassesCount < min;

        // Is underloaded
        if (isUnderloaded) {
            const value = min - assignedClassesCount;
            const loadString = getLoadString(value);
            const label = `${value} ${loadString} under`;
            return (
                <StatusChip feedback={feedback} color="yellow" label={label} />
            );
        }

        const isOverloaded = assignedClassesCount > max;
        const isMaximum = assignedClassesCount === max;
        const isWithinRange = !isUnderloaded && !isOverloaded && !isMaximum;

        if (isWithinRange) {
            const value = max - assignedClassesCount;
            const loadString = getLoadString(value);
            const label = `${value} ${loadString} under limit`;
            return (
                <StatusChip feedback={feedback} color="green" label={label} />
            );
        }

        if (isMaximum) {
            return (
                <StatusChip
                    feedback={feedback}
                    color="green"
                    label={`Full load`}
                />
            );
        }

        if (isOverloaded) {
            const value = assignedClassesCount - max;
            const loadString = getLoadString(value);
            const label = `${value} ${loadString} over limit`;
            return <StatusChip feedback={feedback} color="red" label={label} />;
        }
    }

    render() {
        return (
            <Grid container spacing={8} direction="row" wrap="nowrap">
                <Grid item>{this.renderChip()}</Grid>
            </Grid>
        );
    }
}
