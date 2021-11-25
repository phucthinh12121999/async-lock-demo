const UsersModel = require("../model/users.js");

module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: function (req, res) {
      const user = UsersModel.findOne({});
      //   console.log("User List: " + JSON.stringify(user));
      return user;
    },
  },
  {
    method: "POST",
    path: "/users/create",
    handler: function (req, res) {
      const payload = req.payload;

      const user = {
        name: payload.name,
        birthDate: payload.birthDate,
        gender: payload.gender,
      };

      const status = UsersModel.create(user);

      return status;
    },
  },
  {
    method: "PUT",
    path: "/users/update",
    handler: (req, res) => {
      const payload = req.payload;

      const userId = req.payload.userId;

      const update_user = {
        address: payload.address || null,
        email: payload.email || null,
      };

      const status = UsersModel.updateOne({ userId: userId }, update_user);

      return status;
    },
  },
  {
    method: "PUT",
    path: "/users/delete",
    handler: (req, res) => {
      const payload = req.payload;

      const userId = req.payload.userId;

      const status = UsersModel.updateOne(
        { userId: userId },
        { isDeleted: true }
      );

      return status;
    },
  },
];
