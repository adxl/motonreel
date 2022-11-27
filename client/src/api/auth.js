import { _get, _post } from "./gateway";

export function getCurrentUser(token) {
  return _get("/me", token);
}

export function register(data) {
  return _post("register", data);
}

export function login(data) {
  return _post("/login", data);
}
