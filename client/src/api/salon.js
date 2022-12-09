import { _get } from "./gateway";

export function getSalons(token) {
  return _get("/salons", token);
}
