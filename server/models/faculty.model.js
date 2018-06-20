import mongoose, { Schema } from "mongoose";
import { EMPLOYMENTS, SEXES } from "./enums/faculty.enums";
import {
    DegreeSchema,
    ExtensionWorkSchema,
    InstructionalMaterialSchema,
    PresentationSchema,
    RecognitionSchema,
} from "./faculty_subdocuments.model";


const FacultySchema = new Schema({
    idNumber: {
        type: String,
        required: true,
    },
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

