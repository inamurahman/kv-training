import { useEffect, useRef, useState } from "react"

import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import logo from '../../assets/kv-logo.png'
import './LoginRightContainer.css'
// import useMousePointer from "../../hooks/useMousePointerHook"
import { useLocalStorageHook } from "../../hooks/useLocalStorageHook"


const EndAdornment = (props: { fn: VoidFunction}) => {
    return (
        <Button type="button" variant="grey" text="X" className="button-endadornment" onclick={props.fn}/>
    )
}

export const LoginRightContainer = () => {
    const  [username , setUsername] = useState('');
    const  [password , setPassword] = useState('');
    const [message, setMessage] = useState('');

    const  [showPassword , setShowPassword] = useLocalStorageHook("showPassword", "false");


    const usernameRef = useRef<HTMLInputElement>(null);

    // const [coordinates] = useMousePointer();

    const handleclickClear = () => {
        setUsername('')
    }

    const handleShowPasswordCheckbox = () => {
        if (showPassword === "true") setShowPassword("false")
            else setShowPassword("true")
    }

    useEffect(() => {
        if(usernameRef.current) {
            usernameRef.current?.focus();
        }
    },[])

    useEffect(() => {
        if (username.length > 10) {
            setMessage("⚠️ Username exceeded 10 character limit");
        } 
        
        return () => {
            setMessage('')
        }
        
    }, [username])

    return (
        <div className="login-div">
            <div className="login-form-container">
                <div className="login-form-element">
                    <img src={logo} className="logo"/>
                </div>
                <div className="login-form-element">
                    <Input variant="login" name="Username" type="text" label="Username" placeholder=" " onchange={((event) => setUsername(event.target.value))} value={username} inputRef={usernameRef} endAdornment={<EndAdornment fn={handleclickClear}  />}/>

                    {
                        message && 
                            <div style={{marginLeft: "20px", padding:"0px", color:"red", borderRadius:"5px"}}>
                            {message}
                            </div>
                    }
                    

                    <Input variant="login" name="Password" type={JSON.parse(showPassword)? "text" :"Password"} label="Password" placeholder=" " onchange={((event) => setPassword(event.target.value))} value={password} />
                    <div style={{display:"flex", flexDirection:"row", margin:"20px", justifyContent:"left", }}>
                        <input type="checkbox" checked={JSON.parse(showPassword)} onChange={handleShowPasswordCheckbox} style={{width:"20px", marginRight:"10px"}}/>
                        <label>Show password</label>
                    </div>
                    {/* <div className="login-form-element">
                        <p>x : {coordinates.x}</p>
                        <p>y: {coordinates.y}</p>
                    </div> */}
                    <div className="login-form-element">
                        <Button variant="blue" className="button-login" type="submit" text="Login"/>
                    </div>

                </div>
            </div>
        </div>
    )
}