import { _post } from "./gateway";

export function createRequest(advisor, token) {
  return _post("/commRequests/create", { advisor }, token);
}
