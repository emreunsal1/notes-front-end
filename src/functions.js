import axios from "axios";

export const login = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  return fetch("https://notes-demo-backend.herokuapp.com/login", {
    method: "POST",
    mode: "cors",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const getMyNotes = () => {
  return fetch("https://notes-demo-backend.herokuapp.com/me/notes", {
    mode: "cors",
    credentials: "include",
  });
};

// POST  https://notes-demo-backend.herokuapp.com/notes
// obje olarak title ve content yollanacak
