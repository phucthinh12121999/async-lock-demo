const TicketModel = require("../model/tickets.js");
const MovieModel = require("../../movies/model/movies.js");

function getMovieId(id, callback) {
  MovieModel.findOne({ movieId: id }, (err, result) => {
    if (err) {
      return callback(err);
    } else if (result) {
      return callback(null, result);
    } else {
      return callback();
    }
  });
}
// const movie = (id) => {
//   MovieModel.findOne({ movieId: id }, "movieId")
//     .lean()
//     .then((movie_result) => {
//       return movie_result.movieId;
//     });
// };

module.exports = [
  {
    method: "GET",
    path: "/tickets",
    handler: function (req, res) {
      const ticket = TicketModel.find({});
      //   console.log("ticket List: " + JSON.stringify(ticket));
      console.log("Result: ", ticket);
      return ticket;
    },
  },
  {
    method: "POST",
    path: "/tickets/create",
    handler: async function (req, res) {
      const payload = req.payload;
      var result = await MovieModel.findOne({
        movieId: payload.movieId,
      }).exec();

      console.log(result);
      if (result !== null && result.movieId === payload.movieId) {
        const ticket = {
          movieId: payload.movieId,
          quantity: payload.quantity,
        };

        const status = TicketModel.create(ticket);
        return status;
      } else {
        return "This movie is not available at the moment";
      }
    },
  },
  {
    method: "PUT",
    path: "/tickets/update",
    handler: async (req, res) => {
      const payload = req.payload;

      const ticketId = payload.ticketId;

      const old_ticket = await TicketModel.findOne({ ticketId: ticketId });
      if (old_ticket !== null) {
        const update_ticket = {
          quantity: payload.quantity || old_ticket.quantity,
        };

        const status = TicketModel.updateOne(
          { ticketId: ticketId },
          update_ticket
        );

        return status;
      } else {
        return "This movie is not found!!";
      }
    },
  },
  {
    method: "PUT",
    path: "/tickets/delete",
    handler: (req, res) => {
      const payload = req.payload;

      const ticketId = payload.ticketId;

      const status = TicketModel.updateOne(
        { ticketId: ticketId },
        { isDeleted: true }
      );

      return status;
    },
  },
];
