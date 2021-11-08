import React, { useState } from "react";
import { register } from "../functions";
import { useHistory } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function Register() {
  const history = useHistory();
  const [loadingButton, setLoadingButton] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoadingButton(true);
    const username = event.target.username.value;
    const password = event.target.password.value;
    const userData = await register(username, password);
    const data = await userData.data;
    if (data.username) {
      history.push({
        pathname: "/",
        state: {
          user: {
            username,
            password,
          },
        },
      });
    }
    setLoadingButton(false);
  };

  return (
    <div className="login-container">
      <h1>Join us!</h1>
      <form onSubmit={onSubmit}>
        <TextField
          size="small"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          error={username.length <= 7}
          helperText={
            username.length <= 7 && "Username must be longer then 8 character"
          }
          name="username"
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          size="small"
          label="Password"
          variant="outlined"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={password.length <= 7}
          helperText={
            password.length <= 7 && "Password must be longer then 8 character"
          }
          type="password"
          sx={{ mb: 1 }}
        />

        <LoadingButton
          loading={loadingButton}
          type="submit"
          disabled={password.length <= 7 || username.length <= 7}
          variant="outlined"
          sx={{ mx: "auto", mt: 2 }}
        >
          REGISTER
        </LoadingButton>
      </form>
    </div>
  );
}
