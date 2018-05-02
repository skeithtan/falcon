import mongoose, { Schema } from "mongoose";

const MonthYearDate = {
    month: Number,
    year: Number,
};


const Presentation = {
    title: String,
    category: {
        type: String,
        enum: ["INSTITUTIONAL", "REGIONAL", "NATIONAL", "INTERNATIONAL"],
        required: true,
    },
    date: MonthYearDate,
    sponsor: String,
    venue: String,
    conference: String,
    medium: {
        type: String,
        enum: ["PAPER", "POSTER", "RESEARCH"],
        required: true,
    },
    daysDuration: Number,
};

const Recognition = {
    title: String,
    basis: {
        type: String,
        enum: ["RESEARCH", "SCHOLARSHIP", "EXTENSION_WORK", "CIVIC"],
        required: true,
    },
    date: MonthYearDate,
    sponsor: String,
};

const InstructionalMaterial = {
    title: String,
    medium: {
        type: String,
        enum: ["PRINT", "NON_PRINT"],
        required: true,
    },
    classification: {
        type: String,
        enum: ["STUDENT", "TEACHER"],
        required: true,
    },
    usageYear: Number,

    // Student only fields
    level: {
        type: String,
        enum: ["1", "2", "3", "4"],
        required: function () {
            return this.classification === "STUDENT";
        },
    },

    // Non-print types
    nonPrintType: {
        type: String,
        enum: ["MODULE", "VIDEO", "SLIDE", "DIGITAL_FILE", "AUDIO"],
        required: function () {
            return this.medium === "NON_PRINT";
        },
    },
};

const ExtensionWork = {
    title: String,
    roles: {
        lecturer: Boolean,
        trainer: Boolean,
        resourceSpeaker: Boolean,
        facilitator: Boolean,
        coach: Boolean,
        materialWriter: Boolean,
    },
    venue: String,
};

const FacultySchema = new Schema({
    user: {
        type: ObjectId,
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
    birthDate: Date,
    presentations: [Presentation],
    recognitions: [Recognition],
    instructionalMaterials: [InstructionalMaterial],
    extensionWorks: [ExtensionWork],
    teachingSubjects: [{
        type: ObjectId,
        ref: "Subject",
        required: true,
    }],
});

const Faculty = mongoose.model("Faculty", FacultySchema);
export default Faculty;