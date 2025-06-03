import "./Sidebar.css"
import employeeIcon from "../../assets/icon.svg"
import logoutIcon from "../../assets/out.png"

import { useLocalStorageHook } from "../../hooks/useLocalStorageHook"
import { useNavigate } from "react-router-dom"

export const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorageHook("isLoggedIn", "false")
    
    const navigate = useNavigate()
    
    const logout = () => {
        // setIsLoggedIn("false")
        localStorage.setItem("token", '')
        navigate('/login')
    }

    return (
        <aside className="sidebar">
            <nav className="nav">
                <a className = "nav-button" onClick={()=>navigate('/employees')}>
                    <div className="button-image">
                        <img src={employeeIcon} />
                    </div>
                    <div className="sidebar-label">Employee List</div>   
                </a>    
                <a className = "nav-button" onClick={logout} style={{backgroundColor: "grey"}}>
                    <div className="button-image">
                        <img src={logoutIcon} style={{width: "100%"}}/>
                    </div>
                    <div className="sidebar-label">Logout</div>   
                </a>
            </nav>  
            
        </aside>
    )
}
