const mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    movieId: {
      type: Number,
      ref: "Movie",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

autoIncrement.initialize(mongoose.connection);
MovieSchema.plugin(autoIncrement.plugin, {
  model: "Movies",
  field: "movieId",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Movies", MovieSchema);
