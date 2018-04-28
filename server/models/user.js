import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


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
    },
);

//Do not replace function(next) with arrow functions - JavaScript `this` only works on old anonymous functions
UserSchema.pre("save", function(next) {
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

const User = model("User", UserSchema);
export default User;