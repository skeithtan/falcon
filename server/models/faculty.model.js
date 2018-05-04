import mongoose, { Schema } from "mongoose";

const MonthYearDate = {
    month: Number,
    year: Number,
};

const PresentationSchema = new Schema({
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
});

const RecognitionSchema = new Schema({
    title: String,
    basis: {
        type: String,
        enum: ["RESEARCH", "SCHOLARSHIP", "EXTENSION_WORK", "CIVIC"],
        required: true,
    },
    date: MonthYearDate,
    sponsor: String,
});

const InstructionalMaterialSchema = new Schema({
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
});

const ExtensionWorkSchema = new Schema({
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
    birthDate: Date,
    presentations: [PresentationSchema],
    recognitions: [RecognitionSchema],
    instructionalMaterials: [InstructionalMaterialSchema],
    extensionWorks: [ExtensionWorkSchema],
    teachingSubjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    }],
});

const Faculty = mongoose.model("Faculty", FacultySchema);
const Presentation = mongoose.model("Presentation", PresentationSchema);
const Recognition = mongoose.model("Recognition", RecognitionSchema);
const InstructionalMaterial = mongoose.model("InstructionalMaterial", InstructionalMaterialSchema);
const ExtensionWork = mongoose.model("ExtensionWork", ExtensionWorkSchema);

export {
    Faculty,
    Presentation,
    Recognition,
    InstructionalMaterial,
    ExtensionWork,
};