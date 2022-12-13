import { _get, _patch, _post } from "./gateway";

export function createRequest(advisor, token) {
  return _post("/commRequests/create", { advisor }, token);
}

export function getRequests(token) {
  return _get("/commRequests", token);
}

export function updateRequest(id, status, token) {
  return _patch("/commRequests/" + id, { status }, token);
}
