const mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    ticketId: {
      type: Number,
      require: true,
    },
    movieId: {
      type: Number,
      require: true,
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

TicketSchema.plugin(autoIncrement.plugin, {
  model: "Tickets",
  field: "ticketId",
});

// TicketSchema.virtual("user", {
//   ref: "Users",
//   localField: "userId",
//   foreignField: "userId",
//   justOne: true,
// });

TicketSchema.virtual("movie", {
  ref: "movies",
  localField: "movieId",
  foreignField: "movieId",
  justOne: true,
});

module.exports = mongoose.model("Tickets", TicketSchema);
