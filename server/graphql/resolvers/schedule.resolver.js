import { Subject, Term } from "../../models/schedule.model";
import { limitAccess } from "../../utils/user_decorator";
import { DEAN, ASSOCIATE_DEAN, CLERK } from "../../models/user.model";

const NO_FACULTY = [DEAN, ASSOCIATE_DEAN, CLERK];

function subjects() {
    return Subject.find({});
}

function createSubject(object, args) {
    return Subject.create(args);
}

function modifySubject(object, args) {
    const {_id, ...newSubject} = args;
    // new: true specifies that the updated version is returned
    return Subject.findByIdAndUpdate(_id, newSubject, {new: true});
}

const queryResolvers = {
    subjects: limitAccess(subjects, {allowed: NO_FACULTY, action: "Get all subjects"}),
};

const mutationResolvers = {
    createSubject: limitAccess(createSubject, {allowed: NO_FACULTY, action: "Create subject"}),
    modifySubject: limitAccess(modifySubject, {allowed: NO_FACULTY, action: "Modify subject"}),
};

export { queryResolvers, mutationResolvers };