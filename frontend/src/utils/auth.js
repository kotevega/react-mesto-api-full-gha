export const baseUrl = "http://localhost:3000";
// export const baseUrl = "https://api.mestokote.nomoreparties.co";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const checkTokenApi = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    credentials: "include",
  }).then((res) => checkResponse(res));
};
