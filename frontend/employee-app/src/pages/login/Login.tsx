import { LoginLeftContainer } from "../../containers/login-left-container/LoginLeftContainer"
import { LoginRightContainer } from "../../containers/login.right.container/LoginRightContainer"
import "./Login.css"

export const Login= () => {
    return (
        <div className="container">
            <LoginLeftContainer/>
            <LoginRightContainer/>
        </div>
    )
}