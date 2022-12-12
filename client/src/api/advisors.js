import { _get, _patch } from "./gateway";

export function getAdvisors(token) {
  return _get("/advisors", token);
}

export function update(id, disponibility, token) {
  return _patch(`/users/${id}`, { disponibility }, token);
}
