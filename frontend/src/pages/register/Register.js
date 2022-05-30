import { axiosInstance } from "../../config";
import { useRef } from "react";
import "./Register.css";
import { useHistory } from "react-router";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstance.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login1">
      <div className="loginWrapper1">
        <div className="loginLeft1">
          <h3 className="loginLogo">Share Memory 💗</h3>
          <span className="loginDesc">
          Share your memories and connect with your friends 😍.
          </span>
        </div>
        <div className="loginRight1">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <div className="boxConatiner" >
            <span className="span1" >Have a already account just </span>
           
            <a href="/login" className="SignInbutton">Sign In</a>
           
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}