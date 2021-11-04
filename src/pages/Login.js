import React from "react";
import { login } from "../functions";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  const getPost = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const userData = await login(username, password);
    const data = await userData.json();
    if (data.token) {
      history.push("/notes");
    }
  };

  return (
    <div>
      <form onSubmit={getPost}>
        <input type="text" name="username"></input>
        <input type="password" name="password"></input>
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
}
