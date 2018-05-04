import { Faculty, Presentation } from "../../models/faculty.model";
import { User } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { FACULTY } from "../../models/user.model";

function faculties() {
    return Faculty.find({}).populate("user");
}

async function createFaculty(object, args) {
    const facultyInput = args.faculty;
    const userInput = args.user;

    userInput.authorization = FACULTY;
    userInput.secret = userInput.password;

    const user = await User.create({...userInput});
    facultyInput.user = user._id;

    try {
        const faculty = await Faculty.create({...facultyInput});
        faculty.user = user;
        return faculty;
    } catch (error) {
        console.log(`Error occurred while creating faculty object: ${error.message}`);

        // We either keep both or none, but never just the user
        await User.findByIdAndRemove({_id: user.id});
        throw error;
    }
}

async function createPresentation(object, args) {
    const presentationInput = args.presentation;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.presentations.push({...presentationInput});
    faculty.save();

    return faculty.presentations[faculty.presentations.length - 1];
}


export const queryResolvers = {
    faculties: limitAccess(faculties, {allowed: NO_FACULTY, action: "Get all faculties"}),
};

export const mutationResolvers = {
    createFaculty: limitAccess(createFaculty, {allowed: NO_FACULTY, action: "Create faculty"}),
    createPresentation: limitAccess(createPresentation, {allowed: NO_FACULTY, action: "Create presentation"}),
};
