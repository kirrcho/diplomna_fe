import * as React from "react";
import { Navigate } from "react-router-dom";

const Homepage = () => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return <></>;
};

export default Homepage;
