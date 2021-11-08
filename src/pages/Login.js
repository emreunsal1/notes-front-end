import React, { useState, useEffect } from "react";
import { login, setAuthToken } from "../functions";
import { useHistory, useLocation } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const [loadingButton, setLoadingButton] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoadingButton(true);
    const username = event.target.username.value;
    const password = event.target.password.value;
    const userData = await login(username, password);
    const { token } = userData.data;
    if (token) {
      setAuthToken(token);
    }

    if (userData.status != 200) {
      setLoadingButton(false);
      return setIsError(true);
    }

    const data = await userData.data;
    if (data.token) {
      history.push("/notes");
    }
    setLoadingButton(false);
  };

  return (
    <div className="login-container">
      <h1>Welcome to Sticky Notes</h1>
      <form onSubmit={onSubmit}>
        <TextField
          size="small"
          label="Username"
          value={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
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
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          fullWidth
          type="password"
          sx={{ mb: 1 }}
        />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isError}
          autoHideDuration={1500}
          onClose={() => setIsError(false)}
        >
          <Alert variant="filled" severity="error">
            Username or Password is wrong!
          </Alert>
        </Snackbar>

        <LoadingButton
          loading={loadingButton}
          type="submit"
          disabled={user.password.length <= 7 || user.username.length <= 7}
          variant="outlined"
          sx={{ mx: "auto", mt: 2 }}
        >
          LOGIN
        </LoadingButton>
        <Typography textAlign="center" sx={{ color: "white", my: 2 }}>
          or
        </Typography>
        <RouterLink to="/register">
          <Button variant="text" sx={{ mx: "auto", color: "primary.light" }}>
            REGISTER
          </Button>
        </RouterLink>
      </form>
    </div>
  );
}
