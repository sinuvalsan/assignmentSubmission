import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import Login from "./Login/login";
import Dashboard from "./Dashboard/dashboard";
import AssignmentView from "./AssignmentView/assignmentView";
import PrivateRoute from "./PrivateRoute/privateRoute";
import ReviewerDashboard from "./ReviewerDashboard/reviewerDashboard";
import ReviewerAssignmentView from "./ReviewerAssignmentView/reviewerAssignmentView";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./UserProvider/userProvider";
import Register from "./Register/register";

function App() {
  const user = useUser();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(getRolesFromJwt());
  }, [user.jwt]);

  function getRolesFromJwt() {
    if (user.jwt) {
      const tokenDecode = jwtDecode(user.jwt);

      return tokenDecode.authorities;
    }

    return [];
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <ReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:id"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <ReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
    </Routes>
  );
}

export default App;
