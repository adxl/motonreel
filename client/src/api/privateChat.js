import { _get, _post } from "./gateway";

export function getPrivateChat(secUserId, token) {
  return _get(`/privateChat/${secUserId}`, token);
}

export function createPrivateChat(secUser, token) {
  return _post("/privateChat/create", { secUser }, token);
}
