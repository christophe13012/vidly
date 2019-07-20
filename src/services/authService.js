import http from "./httpService";

export function auth(user) {
  return http.post(
    "https://agile-temple-55025.herokuapp.com/api/users/auth",
    user
  );
}
