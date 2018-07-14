import React, { Fragment, PureComponent } from "react";
import { FormDisplayListItem } from "../../../../../../components/FormDisplayListItem";
import { DEGREE, INSTRUCTIONAL_MATERIAL, PRESENTATION, RECOGNITION } from "../../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../../utils/faculty.util";
import { ExtensionWorkRoles } from "../../../faculty_detail_tabs/ExtensionWorksTab";


export class DegreeFields extends PureComponent {
    render() {
        const {changeRequest: degree} = this.props;
        return (
            <Fragment>
                <FormDisplayListItem
                    field="Title"
                    value={degree.title}
                />
                <FormDisplayListItem
                    field="Level"
                    value={DEGREE.LEVEL[degree.level].name}
                />
                <FormDisplayListItem
                    field="Completion year"
                    value={degree.completionYear}
                />
            </Fragment>
        );
    }
}

export class RecognitionFields extends PureComponent {
    render() {
        const {changeRequest: recognition} = this.props;
        return (
            <Fragment>
                <FormDisplayListItem
                    field="Title"
                    value={recognition.title}
                />
                <FormDisplayListItem
                    field="Basis"
                    value={RECOGNITION.BASIS[recognition.basis].name}
                />
                <FormDisplayListItem
                    field="Sponsor"
                    value={recognition.sponsor}
                />
                <FormDisplayListItem
                    field="Date"
                    value={formatMonthYearDate(recognition.date)}
                />
            </Fragment>
        );
    }
}

export class PresentationFields extends PureComponent {
    render() {
        const {changeRequest: presentation} = this.props;
        return (
            <Fragment>
                <FormDisplayListItem
                    field="Title"
                    value={presentation.title}
                />
                <FormDisplayListItem
                    field="Category"
                    value={PRESENTATION.CATEGORY[presentation.category].name}
                />
                <FormDisplayListItem
                    field="Date"
                    value={formatMonthYearDate(presentation.date)}
                />
                <FormDisplayListItem
                    field="Sponsor"
                    value={presentation.sponsor}
                />
                <FormDisplayListItem
                    field="Venue"
                    value={presentation.venue}
                />
                <FormDisplayListItem
                    field="Conference"
                    value={presentation.conference}
                />
                <FormDisplayListItem
                    field="Medium"
                    value={PRESENTATION.MEDIUM[presentation.medium].name}
                />
                <FormDisplayListItem
                    field="Duration"
                    value={`${presentation.daysDuration} Days`}
                />
            </Fragment>
        );
    }
}

export class InstructionalMaterialFields extends PureComponent {
    render() {
        const {changeRequest: instructionalMaterial} = this.props;
        return (
            <Fragment>
                <FormDisplayListItem
                    field="Title"
                    value={instructionalMaterial.title}
                />
                <FormDisplayListItem
                    field="Medium"
                    value={INSTRUCTIONAL_MATERIAL.MEDIUM[instructionalMaterial.medium].name}
                />
                <FormDisplayListItem
                    field="Audience"
                    value={INSTRUCTIONAL_MATERIAL.AUDIENCE[instructionalMaterial.audience].name}
                />
                <FormDisplayListItem
                    field="Usage Year"
                    value={instructionalMaterial.usageYear}
                />
                {/*Student exclusive stuff*/}
                {instructionalMaterial.audience === INSTRUCTIONAL_MATERIAL.AUDIENCE.STUDENT.identifier &&
                <FormDisplayListItem
                    field="Student Level"
                    value={instructionalMaterial.level}
                />
                }
            </Fragment>
        );
    }
}

export class ExtensionWorkFields extends PureComponent {
    render() {
        const {changeRequest: extensionWork} = this.props;
        return (
            <Fragment>
                <FormDisplayListItem
                    field="Title"
                    value={extensionWork.title}
                />
                <FormDisplayListItem
                    field="Venue"
                    value={extensionWork.venue}
                />
                <FormDisplayListItem
                    field="Roles"
                    value={<ExtensionWorkRoles roles={extensionWork.roles} />}
                />
            </Fragment>
        );
    }
}