import * as React from "react";
import { Navigate } from "react-router-dom";

const Homepage = () => {
  const isSignedIn = localStorage.getItem('token') != null;

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }
  return <></>;
};

export default Homepage;
