import { _get } from "./gateway";

export function getAdvisors(token) {
  return _get("/advisors", token);
}
