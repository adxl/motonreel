import { _get, _post } from "./gateway";

export function getCurrentUser(token) {
  return _get("/me", token);
}

export function getUsers(token) {
  return _get("/users", token);
}

export function register(name, email, password) {
  const data = { name, email, password };
  return _post("/register", data);
}

export function login(email, password) {
  const data = { email, password };
  return _post("/login", data);
}
