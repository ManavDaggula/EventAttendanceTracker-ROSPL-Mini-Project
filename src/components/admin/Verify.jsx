import "./admin_css/verify.css"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

const Verify = () => {

    // const navigate = useNavigate()

    // const [attendee, setAttendee] = useState()
    // const promptRef = useRef(null)
    // const [code, setCode] = useState('')

    // function validate(){
    //   if(code==""){
    //     sendPrompt("Enter a code")
    //     return false;
    //   }
    //   if(!code.match(/^[a-zA-Z0-9]{3,3}$/)){
    //     sendPrompt("Invalid code")
    //     return false;
    //   }
      
    //   return true;
    // }
  return (
    <div className="verify-attendee">
    <h3>Enter Attendee Code</h3>
    <input />
    <Link to="/attendee-details" className="button">CHECK</Link>
    </div>
  )
}

export default Verify