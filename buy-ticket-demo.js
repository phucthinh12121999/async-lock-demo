var AsyncLock = require("async-lock");
var lock = new AsyncLock();
const mongoose = require("mongoose");

require("dotenv").config();
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const UserModel = require("./routes/users/model/users.js");
const TicketModel = require("./routes/tickets/model/tickets.js");
const HistoryModel = require("./routes/history/model/history.js");

async function buyTicketWithAsyncLock(userId, ticketId, quantity) {
  var user = await UserModel.findOne({ userId: userId }).exec();
  //   console.log("user info: " + user);
  var ticket = await TicketModel.findOne({ ticketId: ticketId }).exec();
  //   console.log("ticket info: " + ticket);
  if (user !== null && ticket !== null && ticket.quantity > 0) {
    console.log(
      "User " +
        user.name +
        " " +
        "start buying tickets of" +
        " " +
        ticket.movieId
    );
    lock.acquire(
      [userId, ticketId, quantity, user, ticket],
      async function (done) {
        console.log(
          "User " +
            user.name +
            " " +
            "is buying tickets of" +
            " " +
            ticket.movieId
        );
        var update_ticket = await TicketModel.findOne({
          ticketId: ticketId,
        }).exec();
        if (quantity <= update_ticket.quantity) {
          var input = {
            ticketId: ticketId,
            userId: userId,
            quantity: quantity,
          };
          var quantity_after = update_ticket.quantity - quantity;
          TicketModel.updateOne(
            { ticketId: ticketId },
            { quantity: quantity_after },
            (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.log("Quanity Result " + user.name + ": " + result);
                HistoryModel.create(input);
              }
            }
          );
          setTimeout(function () {
            console.log(
              "User " +
                user.name +
                " " +
                "is finishing buying tickets of" +
                " " +
                ticket.movieId
            );
            done();
          }, 1000);
        } else {
          console.log("There is no more tickets available of this movie");
        }
      },
      function (err, ret) {
        console.log(
          "User " +
            user.name +
            " " +
            "has finished buying tickets of" +
            " " +
            ticket.movieId +
            " " +
            "(" +
            ret +
            ")"
        );
      },
      {}
    );
  } else {
    console.log("There is no more tickets available of this movie");
  }
}

buyTicketWithAsyncLock(3, 1, 50);
buyTicketWithAsyncLock(3, 1, 50);
buyTicketWithAsyncLock(4, 1, 50);
