import http from "./httpService";

export function register(user) {
  return http.post("https://agile-temple-55025.herokuapp.com/api/users", user);
}
