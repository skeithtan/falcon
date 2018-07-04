import mongoose, { Schema } from "mongoose";
import { CHANGE_REQUEST_STATUSES } from "./enums/faculty.enums";
import {
    DegreeSchema,
    ExtensionWorkSchema,
    InstructionalMaterialSchema,
    PresentationSchema,
    RecognitionSchema,
} from "./faculty_subdocuments.model";


const ProfileChangeRequestSchema = new Schema({
    status: {
        type: String,
        enum: CHANGE_REQUEST_STATUSES,
        required: true,
    },
    rejectionReason: {
        type: String,
        required: function () {
            return this.status === "REJECTED";
        },
    },
    submitted: {
        type: Date,
        default: Date.now,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
}, {
    discriminatorKey: "subdocumentType",
});

export const ProfileChangeRequest = mongoose.model("ProfileChangeRequest", ProfileChangeRequestSchema);

const makeAddRequestDiscriminator = ({name, schema}) =>
    ProfileChangeRequest.discriminator(name, new Schema({
        // Just copy
        ...schema.obj,
    }));

export const DegreeAddRequest = makeAddRequestDiscriminator({
    name: "Degree",
    schema: DegreeSchema,
});

export const RecognitionAddRequest = makeAddRequestDiscriminator({
    name: "Recognition",
    schema: RecognitionSchema,
});

export const PresentationAddRequest = makeAddRequestDiscriminator({
    name: "Presentation",
    schema: PresentationSchema,
});

export const InstructionalMaterialAddRequest = makeAddRequestDiscriminator({
    name: "InstructionalMaterial",
    schema: InstructionalMaterialSchema,
});

export const ExtensionWorkAddRequest = makeAddRequestDiscriminator({
    name: "ExtensionWork",
    schema: ExtensionWorkSchema,
});
