import "./user_css/homepage.css"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
export default function HomePage(){
    const navigate = useNavigate();
    return(
        <>
            
        <div className="main-page">
            <div className="home-info">
            <h1>STREAMLINE YOUR ATTENDANCE</h1>
            <p>Say goodbye to paper records and manual calculations! Try it today for easy, efficient, and error-free attendance management. Online attendance marking system that simplifies the process for both students and institutions</p>
            </div>
            <div className="btn-section">
                <h3>LOG IN</h3>
                <div className="btns">
                <button className="button" onClick={()=>navigate("/student-form")}>As a Student</button>
                <button className="button" onClick={()=>navigate("/admin")}>As an Admin</button>
            </div>
            </div>
        </div>
        </>
    )
}