const mongoose = require("mongoose");
const Hapi = require("hapi");
require("dotenv").config();
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

const server = new Hapi.Server({
  host: "localhost",
  port: 3000,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var routes = require("./routes/index.js");

server.route(routes);

console.log("Server start!!");

server.start();
