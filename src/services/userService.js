import http from "./httpService";

export function register(user) {
  return http.post("http://localhost:3900/api/users/", {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function login(user) {
  return http.post("http://localhost:3900/api/auth/", {
    email: user.email,
    password: user.password,
  });
}
