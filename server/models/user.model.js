import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";


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
        password: {
            secret: {
                type: String,
                required: true,
            },
            temporary: {
                type: Boolean,
                required: true,
            },
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

// Do not replace function(next) with arrow functions
// JavaScript `this` only works on old anonymous functions
UserSchema.pre("save", function (next) {
    const userIsOld = !this.isNew;
    const passwordIsChanged = this.isModified("password");
    // Calculate hash and salt only when password has been modified
    // AND this is an old user (not creating a new user)
    if (!passwordIsChanged && userIsOld) {
        next();
        return;
    }

    const user = this;
    bcrypt.hash(user.password.secret, SALT_ROUNDS, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.password.secret = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password.secret);
};

export const User = mongoose.model("User", UserSchema);