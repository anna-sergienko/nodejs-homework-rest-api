const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { String },
    avatarURL: {
      type: String,
      required: true,
  },
},
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegex)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
