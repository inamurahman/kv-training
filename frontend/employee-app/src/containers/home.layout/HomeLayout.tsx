import { Header } from "../../components/Header/Header"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import "./HomeLayout.css"

interface Props {
    title: string;
    children: React.ReactNode;
    
}

export const HomeLayout = (props: Props) => {
    return (
        <>
            <Header/>
            <Sidebar/>
            <section className="section-layout">
                <div className="layout-container">
                    <div><h2>{props.title}</h2></div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </section>
        </>
    )
}