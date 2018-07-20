import React, { PureComponent } from "react";
import { StatusChip } from "../../../StatusChip";
import { EMPLOYMENT } from "../../../../../../enums/faculty.enums";

const getLoadString = number => (number === 1 ? "load" : "loads");

export class SchedulingInfo extends PureComponent {
    render() {
        const { faculty, assignedClasses } = this.props;
        const { min, max } = EMPLOYMENT[faculty.employment].load;
        const assignedClassesCount = assignedClasses.length;

        // Is unassigned
        if (assignedClassesCount === 0) {
            return <StatusChip color="red" label="Unassigned" />;
        }

        const isUnderloaded = assignedClassesCount < min;

        // Is underloaded
        if (isUnderloaded) {
            const value = min - assignedClassesCount;
            const loadString = getLoadString(value);
            const label = `${value} ${loadString} under`;
            return <StatusChip color="yellow" label={label} />;
        }

        const isOverloaded = assignedClassesCount > max;
        const isMaximum = assignedClassesCount === max;
        const isWithinRange = !isUnderloaded && !isOverloaded && !isMaximum;

        if (isWithinRange) {
            const value = max - assignedClassesCount;
            const loadString = getLoadString(value);
            const label = `${value} ${loadString} under limit`;
            return <StatusChip color="green" label={label} />;
        }

        if (isMaximum) {
            return <StatusChip color="green" label={`Full load`} />;
        }

        if (isOverloaded) {
            const value = assignedClassesCount - max;
            const loadString = getLoadString(value);
            const label = `${value} ${loadString} over limit`;
            return <StatusChip color="red" label={label} />;
        }
    }
}
