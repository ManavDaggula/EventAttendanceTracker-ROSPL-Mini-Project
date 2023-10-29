import { useEffect } from "react"
import "./user_css/codegenerate.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import codeImage from "./../../assets/codeg.jpg"
export default function CodeGeneration(props){
    const navigate = useNavigate();

    useEffect(()=>{
        // let url = new URL("/checkStatus")
        // url.searchParams.append("attendeeName",props.attendee.name)
        // url.searchParams.append("eventId",props.attendee.eventsId)
        // url.searchParams.append("department",props.attendee.department)
        // url.searchParams.append("div",props.attendee.div)
        // url.searchParams.append("year",props.attendee.year)
        // url.searchParams.append("roll",props.attendee.roll)
        let checker = setInterval(()=>{
            console.log("checking...")
            axios.get(`/checkStatus?attendeeName=${props.attendee.name}&eventId=${props.attendee.eventsId}&department=${props.attendee.department}&div=${props.attendee.div}&year=${props.attendee.year}&roll=${props.attendee.roll}`)
            .then(data=>{
                console.log(data)
                if(data.data){
                    props.setSuccess();
                    clearInterval(checker)
                    navigate("/successful")
                }
            })
            .catch(err=>{
                console.error(err.message);
                clearInterval(checker)
            })
        },2000)
        return ()=>{
            clearInterval(checker);
        }
        console.log(props.attendee)
    },[])
    return(
        <div className="code-div">
        <div className="code-image">
            <img src={codeImage}/>
            </div>
        <div className="code-content">
            <h4>YOUR CODE</h4>
            <h1>{props.code}</h1>
            <p>Please provide above code to the respective volunteer to confirm your presence.</p>
        </div>
        </div>
    )
}