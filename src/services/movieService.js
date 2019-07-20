import http from "./httpService";

export function getMovies() {
  return http.get("https://agile-temple-55025.herokuapp.com/api/movies");
}

export function getMovie(id) {
  return http.get("https://agile-temple-55025.herokuapp.com/api/movies/" + id);
}

export function deleteMovie(id) {
  return http.delete(
    "https://agile-temple-55025.herokuapp.com/api/movies/" + id
  );
}

export function saveMovie(movie) {
  if (movie._id)
    return http.put(
      "https://agile-temple-55025.herokuapp.com/api/movies/" + movie._id,
      movie
    );
  return http.post(
    "https://agile-temple-55025.herokuapp.com/api/movies",
    movie
  );
}
