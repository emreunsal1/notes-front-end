import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://notes-demo-backend.herokuapp.com",
});
customAxios.interceptors.request.use((config) => {
  config.headers["authcookie"] = getAuthToken() || "";

  return config;
});

customAxios.interceptors.response.use((config) => {
  if (config.status === 401) {
    clearAuthToken();
  }
  return config;
});

export const clearAuthToken = () => localStorage.clear();
export const getAuthToken = () => localStorage.getItem("token");
export const setAuthToken = (value) => localStorage.setItem("token", value);

export const login = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  return customAxios.post("/login", data);
};

export const register = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  return customAxios.post("/register", data);
};

export const getMyNotes = () => {
  return customAxios.get("/me/notes");
};

export const addNotes = (title, content) => {
  const data = {
    title: title,
    content: content,
  };
  return customAxios.post("/notes", data);
};

export const deleteNote = (id) => {
  return customAxios.delete(`/notes/${id}`);
};

export const editNote = (noteId, data) => {
  return customAxios.put(`/notes/${noteId}`, data);
};

export const updateFavorited = (noteId, bool) => {
  const data = {
    favorited: bool,
  };
  return customAxios.put(`/notes/favorite/${noteId}`, data);
};

export const logOut = () => {
  return fetch("https://notes-demo-backend.herokuapp.com/logout", {
    method: "POST",
    mode: "cors",
  });
};
// POST  https://notes-demo-backend.herokuapp.com/notes
// obje olarak title ve content yollanacak
