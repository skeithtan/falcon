import mongoose, { Schema } from "mongoose";
import { PRESENTATION_CATEGORIES, PRESENTATION_MEDIUMS } from "./enums/faculty.enums";

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
const PresentationSchema = new Schema({
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
});
const RecognitionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    basis: {
        type: String,
        enum: ["RESEARCH", "SCHOLARSHIP", "EXTENSION_WORK", "CIVIC"],
        required: true,
    },
    date: MonthYearDate,
    sponsor: {
        type: String,
        required: true,
    },
});
const InstructionalMaterialSchema = new Schema({
    title: String,
    medium: {
        type: String,
        enum: ["PRINT", "MODULE", "VIDEO", "SLIDE", "DIGITAL_FILE", "AUDIO"],
        required: true,
    },
    audience: {
        type: String,
        enum: ["STUDENT", "TEACHER"],
        required: true,
    },
    usageYear: {
        type: Number,
        required: true,
    },
    // Student only fields
    level: {
        type: String,
        enum: ["1", "2", "3", "4"],
        required: function () {
            return this.audience === "STUDENT";
        },
    },
});

const ExtensionWorkSchema = new Schema({
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
});
const DegreeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: ["ASSOCIATE", "BACHELOR", "MASTER", "DOCTORATE"],
    },
    completionYear: {
        type: Number,
        required: true,
    },
});
const FacultySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sex: {
        type: String,
        enum: ["M", "F"],
        required: true,
    },
    employment: {
        type: String,
        enum: ["FULL_TIME_PERMANENT", "FULL_TIME_TEMPORARY", "PART_TIME"],
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