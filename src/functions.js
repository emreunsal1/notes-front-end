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

export const register = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  return fetch("https://notes-demo-backend.herokuapp.com/register", {
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

export const addNotes = (title, content) => {
  const data = {
    title: title,
    content: content,
  };
  return fetch("https://notes-demo-backend.herokuapp.com/notes", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    mode: "cors",
    headers: { "content-type": "application/json" },
  });
};

export const deleteNote = (id) => {
  return fetch(`https://notes-demo-backend.herokuapp.com/notes/${id}`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
  });
};

export const editNote = (noteId, data) => {
  return fetch(`https://notes-demo-backend.herokuapp.com/notes/${noteId}`, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
};

// POST  https://notes-demo-backend.herokuapp.com/notes
// obje olarak title ve content yollanacak
