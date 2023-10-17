import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { addEvents, adminExists, checkAttendeeStatus, endEvent, getAttendee, listEvents, listRegisteredAttendee, listRunningEvents, newAttendee, startEvent, verifyAttendee } from "./dbOps.js";

dotenv.config();
const app = e();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(e.json())
app.use(cors({credentials:true, origin:["http://localhost:5173","http://localhost:4173"]}));
app.use(cookieParser());

function verifyRequest(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    // console.log(token);
    jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
        if(err){
            res.status(401).send("Unauthorised");
        }
        next();
    })
  } else {
    res.status(403).send("Forbidden");
  }
}

app.get("/", (req, res) => {
  res.send("Express working");
});

app.post("/login", (req, res) => {
  let uname = req.body.username;
  let pwd = req.body.password;
  console.log(uname,pwd);
  adminExists(uname)
    .then((x) => {
      bcrypt.compare(req.body.password, x, (err, result) => {
        if (result) {
          // sign token and send it
          const token = jwt.sign({ uname: uname }, process.env.JWT_SECRET, {
            expiresIn: "20min",
          });
          res.cookie("token", token).sendStatus(200);
        } else {
          res.status(401).send("Invalid Credentials");
        }
      });
    })
    .catch((x) => res.status(401).send("User does not exist."));
});

app.get("/logout", (req, res)=>{
  res.clearCookie("token").sendStatus(200)
})

app.get("/listEvents", verifyRequest, (req, res) => {
  // console.log("here")
  listEvents().then(data=>{
    console.log(data);
    res.status(200).send(data);
  })
});

app.get("/listRunningEvents", (req,res)=>{
    listRunningEvents().then(data=>{
        res.status(200).json(data);
    })
})

app.get("/startEvent",verifyRequest, (req,res)=>{
  const eventName = req.query.event;
  if(!eventName){res.status(400).send("Event must be specified.")}
  startEvent(eventName)
  .then(data=>res.sendStatus(200))
  .catch(err=>res.status(500).send(err))
})

app.get("/stopEvent",verifyRequest, (req,res)=>{
  const eventName = req.query.event;
  if(!eventName){res.status(400).send("Event must be specified.")}
  endEvent(eventName)
  .then(data=>res.sendStatus(200))
  .catch(err=>res.status(500).send(err))
})

app.post("/addEvent", verifyRequest, (req,res)=>{
  const eventName = req.body.eventName;
  const eventTime = req.body.eventTime;
  if(eventName && eventTime){
    addEvents(eventName, eventTime)
    .then(event =>{res.sendStatus(200)})
    .catch(err => res.status(500).send(err.message))
  }
  else{
    res.status(400).send("Invalid event addition request.")
  }
})

app.get("/listAttendees",verifyRequest, (req,res)=>{
  const event = req.query.event;
  if(!event){
    res.status(400).send("Invalid request. Specify event.");
  }
  listRegisteredAttendee(event)
  .then(data=>res.status(200).json(data))
  .catch(err=>res.status(500).send(err.message))
})

app.post("/newAttendee", (req,res)=>{
  const name = req.body.name;
  const event = req.body.event;
  const roll = req.body.roll;
  const year = req.body.year;
  const department = req.body.name;
  const div = req.body.div;
  if(name && event && roll && year && department && div){
    newAttendee(name, roll, department, year, div, event)
    .then((record)=>{
      res.status(200).send(record);
    })
  }
  else{
    res.status(400).send("Details missing...");
  }
})

app.get("/getAttendee", verifyRequest, (req, res)=>{
  const eventName = req.query.eventName;
  const code = req.query.code;
  if(eventName && code){
    getAttendee(eventName, code)
    .then(data =>{
      res.status(200).json(data);
    })
    .catch(err=>{
      res.status(500).send("No such record.");
    })
  }
  else{
    res.status(400).send("Incomplete data.")
  }
})

app.post("/verifyAttendee", verifyRequest, (req,res)=>{
  const eventName = req.body.eventName;
  const code = req.body.code;
  if(eventName && code){
    verifyAttendee(eventName, code)
    .then(data =>{
      res.sendStatus(200);
    })
    .catch(err=>{
      res.status(500).send(err.message);
    })
  }
  else{
    res.status(400).send("Incomplete data.")
  }
})

app.get("/checkStatus",(req,res)=>{
  const eventId = req.query.eventId;
  // const code = req.query.code;
  const attendeeName = req.query.attendeeName;
  const department = req.query.department;
  const div = req.query.div;
  const year = req.query.year;
  const roll = req.query.roll;
  if(!(eventId && attendeeName && department && div && year && roll)){
    res.sendStatus(400)
  }
  else{
    checkAttendeeStatus(eventId, attendeeName, roll, div, year, department)
    .then(d => res.status(200).send(d))
    .catch(err=>res.status(500).send(err.message))
  }
})

app.listen(8000, () => {
  console.log("listening....");
});
