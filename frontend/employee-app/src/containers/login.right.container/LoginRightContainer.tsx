import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import logo from '../../assets/kv-logo.png'
import './LoginRightContainer.css'

export const LoginRightContainer = () => {
    return (
        <div className="login-div">
            <div className="login-form-container">
                <div>
                    <img src={logo} className="logo"/>
                </div>
                <div>
                    <Input variant="login" name="Username" type="Password" label="Username" placeholder=" "/>
                    <Input variant="login" name="Password" type="Password" label="Password" placeholder=" "/>
                    <div className="login-form-element">
                        <Button variant="blue" className="button-login" type="submit" text="Login"/>
                    </div>

                </div>
            </div>
        </div>
    )
}