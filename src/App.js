import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { login } from "./functions";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
export default function App() {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
      </Router>
    </div>
  );
}
