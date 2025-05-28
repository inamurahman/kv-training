import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import "./HomeLayout.css"


interface Props {
    title: string;    
}

export const HomeLayout = () => {

    const isLoggedIn = () => {
        const token = localStorage.getItem("isLoggedIn")
        return token === "true";
    }

    const navigate=useNavigate();

    if (!isLoggedIn()) navigate('/login') 

    return (
        <>
            <Header/>
            <Sidebar/>

            <section className="section-layout">
                <div className="layout-container">
                        <Outlet />
                </div>
            </section>
        </>
    )
}