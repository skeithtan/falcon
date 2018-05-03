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

const queryResolvers = {
    subjects: limitAccess(subjects, {allowed: NO_FACULTY, action: "Get all subjects"}),
};

const mutationResolvers = {
    createSubject: limitAccess(createSubject, {allowed: NO_FACULTY, action: "Create subject"}),
};

export { queryResolvers, mutationResolvers };