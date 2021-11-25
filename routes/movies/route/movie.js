const MoviesModel = require("../model/movies.js");

module.exports = [
  {
    method: "GET",
    path: "/movies",
    handler: function (req, res) {
      const movies = MoviesModel.find({});
      //   console.log("User List: " + JSON.stringify(user));
      return movies;
    },
  },
  {
    method: "GET",
    path: "/movies/{movieId}",
    handler: function (req, res) {
      const movie = MoviesModel.findOne({ movieId: req.params.movieId });
      //   console.log("User List: " + JSON.stringify(user));
      return movie;
    },
  },
  {
    method: "POST",
    path: "/movies/create",
    handler: function (req, res) {
      const payload = req.payload;

      const movie = {
        name: payload.name,
        type: payload.type,
        rating: payload.rating,
        description: payload.description || null,
      };

      const status = MoviesModel.create(movie);

      return status;
    },
  },
  {
    method: "PUT",
    path: "/movies/update",
    handler: (req, res) => {
      const payload = req.payload;

      const movieId = payload.movieId;

      const old_movie = MoviesModel.findOne({ movieId: movieId });
      if (old_movie !== null) {
        const update_movie = {
          name: payload.name || old_movie.name,
          type: payload.type || old_movie.type,
          rating: payload.rating || old_movie.rating,
          description: payload.description || old_movie.description,
        };

        const status = MoviesModel.updateOne(
          { movieId: movieId },
          update_movie
        );

        return status;
      } else {
        return "This movie is not found!!";
      }
    },
  },
  {
    method: "PUT",
    path: "/movies/delete",
    handler: (req, res) => {
      const payload = req.payload;

      const movieId = payload.movieId;

      const status = MoviesModel.updateOne(
        { movieId: movieId },
        { isDeleted: true }
      );

      return status;
    },
  },
];
