import { _delete, _get, _patch, _post } from "./gateway";

export function getSalons(token) {
  return _get("/salons", token);
}

export function getSalon(id, token) {
  return _get(`/salons/${id}`, token);
}

export function createSalon(name, userSize, token) {
  const data = { name, userSize };
  return _post(`/salons/create`, data, token);
}

export function updateSalon(id, salon, token) {
  return _patch(`/salons/${id}`, { ...salon }, token);
}

export function deleteSalon(id, token) {
  return _delete(`/salons/${id}`, token);
}
