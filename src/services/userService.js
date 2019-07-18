import http from "./httpService";

export function register(user) {
  return http.post("http://localhost:5000/api/users", user);
}
