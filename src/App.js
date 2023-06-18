import Login from "./auth/login";
import Register from "./auth/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import React, { useState } from "react";
import Homepage from "./homepage";
import Rooms from "./students/rooms.js";
import RoomDetails from "./students/roomDetails.js";
import Student from "./students/student";

const App = () => {
  const [shouldRefresh, setShouldRefresh] = useState();
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(true);

  const callback = (() => { setShouldRefresh(true)});

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
          element={<Login isGoogleAuthLoading={isGoogleAuthLoading} callback={callback} />}
        />
        <Route
          path="/register"
          exact={true}
          element={<Register isGoogleAuthLoading={isGoogleAuthLoading} callback={callback} />}
        />
        <Route
          path="/rooms"
          exact={true}
          element={<Rooms />}
        />
        <Route
          path="/attendances/:id"
          exact={true}
          element={<Student />} 
        />
        <Route
          path="/rooms/details/:id"
          exact={true}
          element={<RoomDetails 
        />}
        />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
