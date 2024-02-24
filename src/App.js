import React from "react";
import "./App.css";
import Auth from "./components/auth/auth";
import UsersTable from "./components/UsersTable/usersTable";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem("seed")
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/usersTable" />
            ) : (
              <Auth setIsAuthenticated={setIsAuthenticated} />
            )
          }
        ></Route>
        <Route
          path="/usersTable"
          element={
            isAuthenticated ? (
              <UsersTable setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
