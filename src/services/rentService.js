import http from "./httpService";

export function rent(rental) {
  return http.post("http://localhost:5000/api/rentals", rental);
}
