import { LoginLeftContainer } from "../../containers/login-left-container/LoginLeftContainer"
import { LoginRightContainer } from "../../containers/login.right.container/LoginRightContainer"
import { UncontrolledLogin } from "../../containers/login.right.container/UncontrolledLogin"
import "./Login.css"

export const Login= () => {

    return (
        <div className="container">
            <LoginLeftContainer/>
            <LoginRightContainer/>
            {/* <UncontrolledLogin/> */}
        </div>
    )
}