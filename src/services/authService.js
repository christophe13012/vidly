import http from "./httpService";

export function auth(user) {
  return http.post("http://localhost:5000/api/users/auth", user);
}
