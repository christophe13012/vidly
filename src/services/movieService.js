import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:5000/api/movies");
}

export function getMovie(id) {
  return http.get("http://localhost:5000/api/movies/" + id);
}

export function deleteMovie(id) {
  return http.delete("http://localhost:5000/api/movies/" + id);
}

export function saveMovie(movie) {
  if (movie._id)
    return http.put("http://localhost:5000/api/movies/" + movie._id, movie);
  return http.post("http://localhost:5000/api/movies", movie);
}
