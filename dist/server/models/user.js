"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_ROUNDS = 10;

var UserSchema = new _mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    secret: {
        type: String,
        required: true
    }
});

//Do not replace function(next) with arrow functions - JavaScript `this` only works on old anonymous functions
UserSchema.pre("save", function (next) {
    var user = this;

    _bcrypt2.default.hash(user.secret, SALT_ROUNDS, function (err, hash) {
        if (err) {
            return next(err);
        }

        user.secret = hash;
        next();
    });
});

var User = (0, _mongoose.model)("User", UserSchema);
exports.default = User;