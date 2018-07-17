import { limitAccess } from "../../utils/user_decorator";
import { FACULTY } from "../../../client/src/enums/user.enums";

export const queryResolvers = {
    current: limitAccess(null, {
        allowed: FACULTY,
        action: "View current faculty current term schedule",
    }),
    archived: limitAccess(null, {
        allowed: FACULTY,
        action: "View current faculty archived terms schedules",
    }),
};

export const mutationResolvers = {};
