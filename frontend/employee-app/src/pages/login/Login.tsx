import { LoginLeftContainer } from "../../containers/login-left-container/LoginLeftContainer"
import { LoginRightContainer } from "../../containers/login.right.container/LoginRightContainer"
import { UncontrolledLogin } from "../../containers/login.right.container/UncontrolledLogin"
import "./Login.css"

const Login= () => {

    return (
        <div className="container">
            <LoginLeftContainer/>
            <LoginRightContainer/>
            {/* <UncontrolledLogin/> */}
            {/* <p>Test pottattte ...</p> */}
        </div>
    )
}

export default Login