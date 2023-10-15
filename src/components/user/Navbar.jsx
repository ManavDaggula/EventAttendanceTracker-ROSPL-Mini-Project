import "./user_css/navbar.css"
import { Link } from "react-router-dom";
export default function Navbar(){
    return(
        <div className="navbar">
        <img src="\src\assets\logo.png" alt="logo"/>
        <div className="nav-opt">
            <ul className="nav-list">
                <li className="list-item"><Link to="/">Home</Link></li>
                <li className="list-item"><Link to="/student-form">Student</Link></li>
                <li className="list-item"><Link to="/admin">Admin</Link></li>
            </ul>
        </div>
        </div>
    )
}