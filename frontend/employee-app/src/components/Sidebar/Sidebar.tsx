import "./Sidebar.css"
import icon from "../../assets/icon.svg"

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <a className = "nav-button">
                    <div className="button-image">
                        <img src={icon} />
                    </div>
                    <div className="sidebar-label">Employee List</div>   
                </a>
            </nav>  
            
        </aside>
    )
}
