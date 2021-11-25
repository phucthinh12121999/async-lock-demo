const mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    historyId: {
      type: Number,
      required: true,
    },
    ticketId: {
      type: Number,
      require: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 100,
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

HistorySchema.plugin(autoIncrement.plugin, {
  model: "History",
  field: "historyId",
});

HistorySchema.virtual("history", {
  ref: "tickets",
  localField: "ticketId",
  foreignField: "ticketId",
  justOne: true,
});

HistorySchema.virtual("history", {
  ref: "users",
  localField: "userId",
  foreignField: "userId",
  justOne: true,
});

module.exports = mongoose.model("History", HistorySchema);
