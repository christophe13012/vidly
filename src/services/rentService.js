import http from "./httpService";

export function rent(rental) {
  return http.post("http://localhost:5000/api/rentals", rental);
}

export function rentals() {
  return http.get("http://localhost:5000/api/rentals");
}
