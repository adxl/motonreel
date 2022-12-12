import { _get, _post } from "./gateway";

export function createRequest(advisor, token) {
  return _post("/commRequests/create", { advisor }, token);
}

export function getRequests(token) {
  return _get("/commRequests", token);
}
