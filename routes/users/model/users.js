const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Number,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// UsersSchema.methods.joiValidate = function (obj) {
//   var Joi = require("joi");
//   var schema = {
//     name: Joi.types.String().required(),
//     birthDate: Joi.types.Date().required(),
//     gender: Joi.types.String().min(2).max(30).required(),
//   };

//   return Joi.validate(obj, schema);
// };
autoIncrement.initialize(mongoose.connection);
UsersSchema.plugin(autoIncrement.plugin, {
  model: "Users",
  field: "userId",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Users", UsersSchema);
