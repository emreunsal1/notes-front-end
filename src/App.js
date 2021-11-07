import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { ThemeProvider, createTheme, Box } from "@mui/material";

import "./style/app.scss";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
export default function App() {
  const theme = createTheme({
    palette: { mode: "dark" },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Router>
      </div>
    </ThemeProvider>
  );
}
