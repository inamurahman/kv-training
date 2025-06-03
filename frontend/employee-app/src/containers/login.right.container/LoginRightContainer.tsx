import { useEffect, useRef, useState } from "react";

import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import logo from "../../assets/kv-logo.png";
import "./LoginRightContainer.css";
// import useMousePointer from "../../hooks/useMousePointerHook"
import { useLocalStorageHook } from "../../hooks/useLocalStorageHook";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api-service/auth/login.api";

const EndAdornment = (props: { fn: VoidFunction }) => {
  return (
    <Button
      type="button"
      variant="grey"
      text="X"
      className="button-endadornment"
      onclick={props.fn}
    />
  );
};

export const LoginRightContainer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [login, {isLoading}] = useLoginMutation();

  const onLogin = async () => {
    login({ email: username, password: password })
    .unwrap()
    .then((response) => {
        localStorage.setItem("token", response.accessToken);
        navigate("/employees");
    }).catch((error) => {
        console.log(error)
        setError(error.data.message)
    })

  };

  const [showPassword, setShowPassword] = useLocalStorageHook(
    "showPassword",
    "false"
  );

  const navigate = useNavigate();

  const user = { username: "admin", password: "admin" };
  const doLogin = () => {
    if (user.username === username && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      localStorage.setItem("isLoggedIn", "false");
      setUsername("");
      setPassword("");
    }
  };

  const usernameRef = useRef<HTMLInputElement>(null);

  // const [coordinates] = useMousePointer();

  const handleclickClear = () => {
    setUsername("");
  };

  const handleShowPasswordCheckbox = () => {
    if (showPassword === "true") setShowPassword("false");
    else setShowPassword("true");
  };

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current?.focus();
    }
  }, []);

//   useEffect(() => {
//     if (!username.includes("@")) {
//       setMessage("⚠️ Username must be a valid e-mail id");
//     }

//     return () => {
//       setMessage("");
//     };
//   }, [username]);

  return (
    <div className="login-div">
      <div className="login-form-container">
        <div className="login-form-element">
          <img src={logo} className="logo" />
        </div>
        <div className="login-form-element">
          <Input
            variant="login"
            name="Username"
            type="text"
            label="Username"
            placeholder=" "
            onchange={(event) => setUsername(event.target.value)}
            value={username}
            inputRef={usernameRef}
            endAdornment={username && <EndAdornment fn={handleclickClear} />}
          />

          {message && (
            <div
              style={{
                marginLeft: "20px",
                padding: "0px",
                color: "red",
                borderRadius: "5px",
              }}
            >
              {message}
            </div>
          )}

          {error && (
            <div
              style={{
                marginLeft: "20px",
                padding: "0px",
                color: "red",
                borderRadius: "5px",
              }}
            >
              {error}
            </div>
          )}

          <Input
            variant="login"
            name="Password"
            type={JSON.parse(showPassword) ? "text" : "Password"}
            label="Password"
            placeholder=" "
            onchange={(event) => setPassword(event.target.value)}
            value={password}
            endAdornment={
              password && <EndAdornment fn={() => setPassword("")} />
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "20px",
              justifyContent: "left",
            }}
          >
            <input
              type="checkbox"
              checked={JSON.parse(showPassword)}
              onChange={handleShowPasswordCheckbox}
              style={{ width: "20px", marginRight: "10px" }}
            />
            <label>Show password</label>
          </div>
          {/* <div className="login-form-element">
                        <p>x : {coordinates.x}</p>
                        <p>y: {coordinates.y}</p>
                    </div> */}
          <div className="login-form-element">
            <Button
              variant="blue"
              className="button-login"
              type="button"
              text="Login"
              onclick={onLogin}
              disabled={username.length === 0 || password.length === 0 || isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
