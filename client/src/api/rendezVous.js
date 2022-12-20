import { _get, _post } from "./gateway";

export function getAllRendezVous(type = null) {
  let path = "/rendezvous/all";

  if (type) {
    path += "?type=" + type;
  }
  return _get(path);
}

export function getUserRendezVous(token) {
  return _get("/rendezvous/self", token);
}

export function createRendezVous(date, type, token) {
  const data = { date, type };
  return _post("/rendezvous/create", data, token);
}
