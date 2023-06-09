import * as React from "react";
import "./login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner";
import GoogleButton from "react-google-button";

function Register(props) {
  const login = useGoogleLogin(() => {});

  return !props.isGoogleAuthLoading ? (
    <div id="loginModal">
      <h2>Register</h2>
      <GoogleButton type="dark" label="Sign up with Google" onClick={login} />
      <p>You already have an account ?</p>
      <Link to="/login">SIGN IN</Link>
    </div>
  ) : (
    <Spinner />
  );
}

export default Register;
