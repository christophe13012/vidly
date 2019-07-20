import http from "./httpService";

export function getGenres() {
  return http.get("https://agile-temple-55025.herokuapp.com/api/genres");
}
