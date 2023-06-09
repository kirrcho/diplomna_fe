import * as React from "react";
import "./login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner";
import GoogleButton from "react-google-button";

function Login(props) {
  const login = useGoogleLogin(() => {});

  return !props.isGoogleAuthLoading ? (
    <div id="loginModal">
      <h2>Login</h2>
      <GoogleButton type="dark" onClick={login} />
      <p>Don't have an account ?</p>
      <Link to="/register">SIGN UP</Link>
    </div>
  ) : (
    <Spinner />
  );
}

export default Login;
