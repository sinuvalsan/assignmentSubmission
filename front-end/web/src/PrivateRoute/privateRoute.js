import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserProvider/userProvider";

const PrivateRoute = ({ children }) => {
  const user = useUser();
  if (user.jwt) {
    const tokenDecode = jwtDecode(user.jwt);
    const currentDate = new Date();
    if (tokenDecode.exp * 1000 >= currentDate.getTime()) {
      return children;
    } else {
      user.setJwt(null);
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
