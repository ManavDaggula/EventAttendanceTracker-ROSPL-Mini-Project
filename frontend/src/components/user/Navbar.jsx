import axios from "axios";
import "./user_css/navbar.css"
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png"
export default function Navbar(props){
    function logOut(){
        axios.get("/api/logOut",{withCredentials: true})
        .then((data)=>{
            props.logOut()
        })
        .catch((err)=>{
            window.alert(err.message)
        })
    }
    return(
        <div className="navbar">
        <img src={logo} alt="logo"/>
        <div className="nav-opt">
            <ul className="nav-list">
                <li className="list-item"><Link to="/">Home</Link></li>
                {props.isAdmin ? <li className="list-item"><Link to="/admin">Admin</Link></li> : <li className="list-item"><Link to="/student-form">Student</Link></li>}
                {props.isAdmin ? <li className="list-item"><Link to="/" onClick={logOut}>Log Out</Link></li> : <li className="list-item"><Link to="/login" >Log In</Link></li>}
            </ul>
        </div>
        </div>
    )
}