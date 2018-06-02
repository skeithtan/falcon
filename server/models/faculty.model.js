import mongoose, { Schema } from "mongoose";
import {
    DEGREE_LEVELS,
    EMPLOYMENTS,
    EXTENSION_WORK_ROLES,
    INSTRUCTIONAL_MATERIAL_AUDIENCE,
    INSTRUCTIONAL_MATERIAL_MEDIA,
    PRESENTATION_CATEGORIES,
    PRESENTATION_MEDIUMS,
    RECOGNITION_BASES,
    SEXES,
    STUDENT_LEVELS,
} from "./enums/faculty.enums";


const MonthYearDate = {
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
};
export const PresentationSchema = {
    title: String,
    category: {
        type: String,
        enum: PRESENTATION_CATEGORIES,
        required: true,
    },
    date: MonthYearDate,
    sponsor: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    conference: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        enum: PRESENTATION_MEDIUMS,
        required: true,
    },
    daysDuration: {
        type: Number,
        required: true,
    },
};
export const RecognitionSchema = {
    title: {
        type: String,
        required: true,
    },
    basis: {
        type: String,
        enum: RECOGNITION_BASES,
        required: true,
    },
    date: MonthYearDate,
    sponsor: {
        type: String,
        required: true,
    },
};
export const InstructionalMaterialSchema = {
    title: String,
    medium: {
        type: String,
        enum: INSTRUCTIONAL_MATERIAL_MEDIA,
        required: true,
    },
    audience: {
        type: String,
        enum: INSTRUCTIONAL_MATERIAL_AUDIENCE,
        required: true,
    },
    usageYear: {
        type: Number,
        required: true,
    },
    // Student only fields
    level: {
        type: String,
        enum: STUDENT_LEVELS,
        required: function () {
            return this.audience === "STUDENT";
        },
    },
};

export const ExtensionWorkSchema = {
    title: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        enum: EXTENSION_WORK_ROLES,
    }],
    venue: {
        type: String,
        required: true,
    },
};
export const DegreeSchema = {
    title: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: DEGREE_LEVELS,
    },
    completionYear: {
        type: Number,
        required: true,
    },
};
const FacultySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sex: {
        type: String,
        enum: SEXES,
        required: true,
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
    teachingSubjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
    }],
    degrees: [DegreeSchema],
    presentations: [PresentationSchema],
    recognitions: [RecognitionSchema],
    instructionalMaterials: [InstructionalMaterialSchema],
    extensionWorks: [ExtensionWorkSchema],
});
export const Faculty = mongoose.model("Faculty", FacultySchema);