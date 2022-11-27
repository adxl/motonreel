import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function get_headers(token) {
  const _headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    _headers["Authorization"] = `Bearer ${token}`;
  }

  return _headers;
}

export function _get(path, token) {
  const headers = get_headers(token);
  return axios.get(URL + path, { headers });
}

export function _post(path, body, token) {
  const headers = get_headers(token);
  return axios.post(URL + path, body, { headers });
}

export function _delete(path, token) {
  const headers = get_headers(token);
  return axios.get(URL + path, { headers });
}
