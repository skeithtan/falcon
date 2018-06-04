import { Schema } from "mongoose";
import { EMPLOYMENTS } from "./enums/faculty.enums";
import {
    DegreeSchema,
    ExtensionWorkSchema,
    InstructionalMaterialSchema,
    PresentationSchema,
    RecognitionSchema,
} from "./faculty.model";


const ChangeTemplate = {
    submitted: {
        type: Date,
        required: true,
        default: Date.now,
    },
    action: {
        type: String,
        enum: ["ADD", "UPDATE", "REMOVE"],
        required: true,
    },
    changeObjectId: {
        type: Schema.Types.ObjectId,
        required: function () {
            return ["UPDATE", "REMOVE"].includes(this.mutationType);
        },
    },
};

function makeChangeSchema({reference, schema}) {
    const mutationChangeSchema = {...ChangeTemplate};
    mutationChangeSchema.changeObjectId.ref = reference;
    mutationChangeSchema.object = {...schema};
    return mutationChangeSchema;
}

const DegreeChange = makeChangeSchema({
    reference: "Faculty.degrees",
    schema: DegreeSchema,
});

const ExtensionWorkChange = makeChangeSchema({
    reference: "Faculty.extensionWorks",
    schema: ExtensionWorkSchema,
});

const InstructionalMaterialChange = makeChangeSchema({
    reference: "Faculty.instructionalMaterials",
    schema: InstructionalMaterialSchema,
});

const RecognitionChange = makeChangeSchema({
    reference: "Faculty.recognitions",
    schema: RecognitionSchema,
});

const PresentationChange = makeChangeSchema({
    reference: "Faculty.presentations",
    schema: PresentationSchema,
});

const OverviewChange = {
    submitted: {
        type: Date,
        required: true,
        default: Date.now,
    },
    sex: {
        type: String,
    },
    name: {
        first: String,
        last: String,
    },
    employment: {
        type: String,
        enum: EMPLOYMENTS,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
};

export const ProfileChangeRequestSchema = new Schema({
    overview: OverviewChange,
    degrees: [DegreeChange],
    extensionWorks: [ExtensionWorkChange],
    instructionalMaterials: [InstructionalMaterialChange],
    recognitions: [RecognitionChange],
    presentations: [PresentationChange],
});