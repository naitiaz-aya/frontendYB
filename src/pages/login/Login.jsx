import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);


  const handleClick = (e) => {
    e.preventDefault();
	loginCall({email:email.current.value,password: password.current.value},dispatch);
  };
  console.log(user);

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
              placeholder="Email"
              required
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              required
              type="password"
			  minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" disabled={isFetching}>{isFetching ? (
                <CircularProgress color="white" size="30px" />
              ) : (
                "Log In"
              )}</button>
			   <Link to="/register" style={{ textDecoration: "none" }}>
          
            <button type="submit" className="loginRegisterButton">{isFetching ? (
				<CircularProgress color="white" size="20px" />
				) : (
					"Register"
					)}</button>
					</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
