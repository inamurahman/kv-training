'use client';

import "./login.css"
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useLocalStorageHook } from "@/hooks/uselocalStorageHook";
import { useRouter } from "next/navigation";
import { login } from "@/actions/loginActions";


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




const LoginRightContainer= () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // const [login, {isLoading}] = useLoginMutation();

    const onLogin = async () => {
        const status = await login(username, password)
        if (status.ok) {
            // localStorage.setItem("token", status.token);
            router.push("/employees")
        } else if(status.error){
            setError(status.error)
        }

    };

    const [showPassword, setShowPassword] = useLocalStorageHook(
        "showPassword",
        "false"
    );

    // const navigate = useNavigate();

    // const user = { username: "admin", password: "admin" };
    // const doLogin = () => {
    //     if (user.username === username && user.password === password) {
    //     localStorage.setItem("isLoggedIn", "true");
    //     router.push("/dashboard");
    //     } else {
    //     localStorage.setItem("isLoggedIn", "false");
    //     setUsername("");
    //     setPassword("");
    //     }
    // };

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

    useEffect(() => {
        if (username.length > 20) {
        setMessage("Username must be less than 20 characters");
        }

        return () => {
        setMessage("");
        };
    }, [username]);

    return (            
        <div className="login-div">
        <div className="login-form-container">
            <div className="login-form-element">
            <img src={"/kv-logo.png"} className="logo" />
            </div>
            <div className="login-form-element">
            <Input
                variant="login"
                id="Username"
                name="Username"
                type="email"
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
                id="Password"
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
                type="submit"
                text="Login"
                onclick={onLogin}
                disabled={username.length === 0 || password.length === 0 }
                />
            </div>
            </div>
        </div>
        </div>
    )
}

export default LoginRightContainer