import Login from "./auth/login";
import Register from "./auth/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route, redirect } from "react-router-dom";
import Navbar from "./navbar";
import React, { useState } from "react";
import Homepage from "./homepage";

const App = () => {
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(true);
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_client_id}
      onScriptLoadSuccess={() => {
        setIsGoogleAuthLoading(false);
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" exact={true} element={<Homepage />} />
        <Route
          path="/login"
          exact={true}
          element={<Login isGoogleAuthLoading={isGoogleAuthLoading} />}
        />
        <Route
          path="/register"
          exact={true}
          element={<Register isGoogleAuthLoading={isGoogleAuthLoading} />}
        />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
