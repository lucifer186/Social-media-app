import { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from '../../functionCall'
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch} = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Share Memory 💗</h3>
          <span className="loginDesc">
            Share your memories and connect with your friends 😍.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox1" onSubmit={submitHandler}>
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              name="email"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              name="password"
              required
              ref={password}
              minLength="7"
            />
            <button className="loginButton" type="submit" disabled={isFetching} >{ isFetching ? <CircularProgress color="white" size="28px"/>: "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register" >  
            <button className="loginRegisterButton1">
              Create a New Account
            </button>
            </Link>
          </form>
         
        </div>
      </div>
    </div>
  );
}
