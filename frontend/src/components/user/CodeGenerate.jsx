import { useEffect } from "react"
import "./user_css/codegenerate.css"
import axios from "axios"
export default function CodeGeneration(props){

    useEffect(()=>{
        // let checker = setInterval(()=>{
        //     console.log("checking...")
        //     axios.get("/checkStatus?eventName="+props.attendee)
        // },2000)
        console.log(props.attendee)
    },[])
    return(
        <div className="code-div">
        <div className="code-image">
            <img src="/src/assets/codeg.jpg"/>
            </div>
        <div className="code-content">
            <h4>YOUR CODE</h4>
            <h1>{props.code}</h1>
            <p>Please provide above code to the respective volunteer to confirm your presence.</p>
        </div>
        </div>
    )
}