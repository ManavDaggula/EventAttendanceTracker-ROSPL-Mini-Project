import { useEffect } from "react"
import "./user_css/codegenerate.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function CodeGeneration(props){
    const navigate = useNavigate();

    useEffect(()=>{
        let url = new URL("http://localhost:8000/checkStatus")
        url.searchParams.append("attendeeName",props.attendee.name)
        url.searchParams.append("eventId",props.attendee.eventsId)
        url.searchParams.append("department",props.attendee.department)
        url.searchParams.append("div",props.attendee.div)
        url.searchParams.append("year",props.attendee.year)
        url.searchParams.append("roll",props.attendee.roll)
        let checker = setInterval(()=>{
            console.log("checking...")
            axios.get(url)
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