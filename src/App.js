import React from "react";
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { ThemeProvider, createTheme } from "@mui/material";

import "./style/app.scss";
import Register from "./pages/Register";
import { getAuthToken } from "./functions";

function useAuth() {
  let location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    if (
      location.pathname !== "/" &&
      location.pathname !== "/register" &&
      (!getAuthToken() || getAuthToken().length == 0)
    ) {
      history.push("/");
    }
  }, [location]);
}

const Wrapper = ({ children }) => {
  useAuth();
  return <div>{children}</div>;
};
export default function App() {
  const theme = createTheme({
    palette: { mode: "dark" },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <Wrapper>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Wrapper>
        </Router>
      </div>
    </ThemeProvider>
  );
}
