import React, { useState } from "react";
import { login } from "../functions";
import { useHistory } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function Login() {
  const history = useHistory();
  const [loadingButton, setLoadingButton] = useState(false);

  const getPost = async (event) => {
    event.preventDefault();
    setLoadingButton(true);
    const username = event.target.username.value;
    const password = event.target.password.value;
    const userData = await login(username, password);
    const data = await userData.json();
    if (data.token) {
      history.push("/notes");
    }
    setLoadingButton(false);
  };

  return (
    <div className="login-container">
      <h1>Welcome to Sticky Notes</h1>
      <form onSubmit={getPost}>
        <TextField
          size="small"
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          size="small"
          label="Password"
          variant="outlined"
          name="password"
          fullWidth
          type="password"
          sx={{ mb: 1 }}
        />
        <LoadingButton
          loading={loadingButton}
          type="submit"
          variant="outlined"
          sx={{ mx: "auto" }}
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
}
