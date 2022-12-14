import { _post } from "./gateway";

export function sendNotification(message, token) {
  return _post("/notification", { message }, token);
}
