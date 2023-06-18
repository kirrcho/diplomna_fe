import * as React from "react";
import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common/spinner";
import axios from "axios";
import { useState } from "react";

function Login(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return !props.isGoogleAuthLoading && !isLoading ? (
    <div id="loginModal">
      <h2>Login</h2>
      <GoogleLogin click_listener={() => { setIsLoading(true) }} onSuccess={async (response) => {
        const result = await axios.post(`${process.env.be_url}/auth/login`, { token: response.credential }, {
          'Content-Type': 'application/json'
        });
        if (result.data.isSuccessful) {
          localStorage.setItem('token', result.data.value);
          props.callback();
          setIsLoading(false);
          navigate("/");
        }
      }}/>
      <p>Don't have an account ?</p>
      <Link to="/register">SIGN UP</Link>
    </div>
  ) : (
    <Spinner />
  );
}

export default Login;
