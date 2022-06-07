import "./register.css";
import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();
  
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
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">YouBook</h3>
          <span className="loginDesc">
            Connect with your friends in YouCode on YooBook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              required
			  minLength="6"
              className="loginInput"
            />
            <input
              placeholder="Confirm Password"
              required
			  type="password"
			  minLength="6"
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton"type="submit" >Register</button>
			<Link to="/login" style={{ textDecoration: "none" }}>
         
            <button className="loginRegisterButton">Log In</button>
        </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
