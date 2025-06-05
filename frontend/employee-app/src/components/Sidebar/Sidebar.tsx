import "./Sidebar.css"
import employeeIcon from "../../assets/icon.svg"
import logoutIcon from "../../assets/out.png"
import { useLocalStorageHook } from "../../hooks/useLocalStorageHook"
import { useLocation, useNavigate } from "react-router-dom"
import profileIcon from "../../assets/profile-icon.png"


export const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorageHook("isLoggedIn", "false")
    const {pathname} = useLocation();
    const navigate = useNavigate()
    
    const logout = () => {
        // setIsLoggedIn("false")
        localStorage.setItem("token", '')
        navigate('/login')
    }

    return (
        <aside className="sidebar">
            <nav className="nav">
                <a className = {`nav-button ${pathname==='/employees' && 'selected-nav' }`} onClick={()=>navigate('/employees')}>
                    <div className="button-image">
                        <img src={employeeIcon} />
                    </div>
                    <div className="sidebar-label">Employee List</div>   
                </a> 
                <a className = {`nav-button ${pathname==='/employees/profile' && 'selected-nav' }`} onClick={()=>navigate('/employees/profile')}>
                    <div className="button-image">
                        <img src={profileIcon} style={{width: "100%"}}/>
                    </div>
                    <div className="sidebar-label">Profile</div>   
                </a>   
                <a className = {`nav-button logout-nav`} onClick={logout}>
                    <div className="button-image">
                        <img src={logoutIcon} style={{width: "100%"}}/>
                    </div>
                    <div className="sidebar-label">Logout</div>   
                </a>
            </nav>  
            
        </aside>
    )
}
