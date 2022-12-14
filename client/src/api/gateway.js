import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function get_headers(token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  return headers;
}

export function _get(path, token) {
  const headers = get_headers(token);
  return axios.get(URL + path, { headers });
}

export function _post(path, body, token) {
  const headers = get_headers(token);
  return axios.post(URL + path, body, { headers });
}

export function _patch(path, body, token) {
  const headers = get_headers(token);
  return axios.patch(URL + path, body, { headers });
}

export function _delete(path, token) {
  const headers = get_headers(token);
  return axios.delete(URL + path, { headers });
}
