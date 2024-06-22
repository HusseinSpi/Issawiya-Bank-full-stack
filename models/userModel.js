const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "A user must have a phone number"],
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value);
      },
      message: "Please provide a valid phone number",
    },
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  UID: {
    type: String,
    unique: true,
  },
  money: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 5000,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.UID) {
    this.UID = this._id;
  }
  if (this.isModified("isAdmin")) {
    this.isAdmin = false;
  }
  if (this.isModified("credit")) {
    this.credit = 5000;
  }
  if (this.isModified("money")) {
    this.money = 0;
  }
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.$set) {
    if (update.$set.isAdmin !== undefined) {
      const error = new Error("You are not allowed to update these fields");
      error.statusCode = 403;
      return next(error);
    }
  } else {
    if (update.isAdmin !== undefined) {
      const error = new Error("You are not allowed to update these fields");
      error.statusCode = "403";
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
