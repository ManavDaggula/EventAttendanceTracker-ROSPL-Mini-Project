import "./user_css/homepage.css"
import Navbar from "./Navbar"
export default function HomePage(){
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
                <button className="button">As a Student</button>
                <button className="button">As an Admin</button>
                </div>
            </div>
        </div>
        </>
    )
}