var users = require("./users/route/user.js");
var movies = require("./movies/route/movie.js");
var tickets = require("./tickets/route/ticket.js");

module.exports = [].concat(users, movies, tickets);
