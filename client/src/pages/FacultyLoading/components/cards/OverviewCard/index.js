import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Toolbar from "@material-ui/core/Toolbar";
import React, { PureComponent } from "react";
import { termScheduleToString } from "../../../../../utils/faculty_loading.util";
import { TERM_STATUSES } from "../../../../../enums/class.enums";

const steps = Object.values(TERM_STATUSES)
    // Remove archived
    .filter(
        ({ identifier }) => identifier !== TERM_STATUSES.ARCHIVED.identifier
    );

export class OverviewCard extends PureComponent {
    render() {
        const { activeTermSchedule } = this.props;
        const activeStepIndex = steps.findIndex(
            step => step.identifier === activeTermSchedule.status
        );

        return (
            <Card>
                <Toolbar>
                    <Typography variant="title">
                        {termScheduleToString(activeTermSchedule)}
                    </Typography>
                </Toolbar>
                <Stepper activeStep={activeStepIndex}>
                        {steps.map(({ identifier, name }) => (
                            <Step key={identifier}>
                                <StepLabel>{name}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
            </Card>
        );
    }
}
