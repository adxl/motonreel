import { _patch } from "./gateway";

export function update(id, disponibility, token) {
  return _patch(`/users/${id}`, { disponibility }, token);
}
