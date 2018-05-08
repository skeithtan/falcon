import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";


export const DEAN = "DEAN";
export const ASSOCIATE_DEAN = "ASSOCIATE_DEAN";
export const FACULTY = "FACULTY";
export const CLERK = "CLERK";

export const USER_TYPES = [DEAN, ASSOCIATE_DEAN, FACULTY, CLERK];

const SALT_ROUNDS = 10;

const UserSchema = new Schema({
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        name: {
            first: {
                type: String,
                required: true,
                trim: true,
            },
            last: {
                type: String,
                required: true,
                trim: true,
            },
        },
        secret: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        authorization: {
            type: String,
            enum: USER_TYPES,
            required: true,
        },

    },
);

//Do not replace function(next) with arrow functions - JavaScript `this` only works on old anonymous functions
UserSchema.pre("save", function (next) {

    const userIsOld = !this.isNew;
    const secretIsChanged = this.isModified("secret");

    // Calculate hash and salt only when password has been modified
    // AND this is an old user (not creating a new user)
    if (!secretIsChanged && userIsOld) {
        next();
        return;
    }

    const user = this;

    bcrypt.hash(user.secret, SALT_ROUNDS, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.secret = hash;
        next();
    });

});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.secret);
};

export const User = mongoose.model("User", UserSchema);