import * as React from "react";
import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common/spinner";
import axios from "axios";

function Register(props) {
  const navigate = useNavigate();

  return !props.isGoogleAuthLoading ? (
    <div id="loginModal">
      <h2>Register</h2>
      <GoogleLogin onSuccess={async (response) => {
        const result = await axios.post(`${process.env.be_url}/auth/register`, { token: response.credential }, {
          'Content-Type': 'application/json'
        });
        if (result.data.isSuccessful) {
          localStorage.setItem('token', result.data.value);
          props.callback();
          navigate("/");
        }
      }}/>
      <p>You already have an account ?</p>
      <Link to="/login">SIGN IN</Link>
    </div>
  ) : (
    <Spinner />
  );
}

export default Register;
