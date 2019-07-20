import http from "./httpService";

export function rent(rental) {
  return http.post(
    "https://agile-temple-55025.herokuapp.com/api/rentals",
    rental
  );
}

export function rentals() {
  return http.get("https://agile-temple-55025.herokuapp.com/api/rentals");
}
