const async_lock = require("async-lock");
const { models } = require("mongoose");
const lock = new async_lock();

module.exports = [
  {
    // method: "POST",
    // path: "/order/ticket",
    // handler: async (req, res) => {
    //   var payload = req.payload;
    //   lock.acquire(payload.userId);
    // },
  },
];
