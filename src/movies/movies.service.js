const knex = require("../db/connection");

function addCritic(movies) {
  return movies.map((movie) => {
    return {
      review_id: movie.review_id,
      content: movie.content,
      score: movie.score,
      created_at: movie.created_at,
      updated_at: movie.updated_at,
      critic_id: movie.critic_id,
      movie_id: movie.movie_id,
      critic: {
        critic_id: movie.critic_id,
        preferred_name: movie.preferred_name,
        surname: movie.surname,
        organization_name: movie.organization_name,
        created_at: movie.created_at,
        updated_at: movie.updated_at,
      },
    };
  });
}

function list(isShowing) {
  if (isShowing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("mt.movie_id")
      .select("m.*")
      .where({ is_showing: true });
  }

  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function movieInTheater() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .groupBy("t.theater_id");
}

function movieReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("m.*", "r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then(addCritic);
}

module.exports = {
  list,
  read,
  movieInTheater,
  movieReviews,
};
