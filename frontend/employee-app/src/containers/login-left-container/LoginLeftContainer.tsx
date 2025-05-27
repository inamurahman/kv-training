import LoginPageImage from "../../assets/kv-login.jpeg"
import './LoginLeftContainer.css'
export const LoginLeftContainer = () => {
    return (
        <div className="image-div">
            <div className="circle">
                <img className="circle-logo" src={LoginPageImage}/>
            </div>
        </div>
    )
}
