import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { adminExists, listEvents, listRunningEvents } from "./dbOps.js";

dotenv.config();
const app = e();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(e.json())
app.use(cors());
app.use(cookieParser());

function verifyRequest(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    console.log(token);
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
  listEvents().then((data) => {
    res.json(data);
  });
});

app.get("/listRunningEvents", (req,res)=>{
    listRunningEvents().then(data=>{
        res.status(200).json(data);
    })
})



app.listen(8000, () => {
  console.log("listening....");
});
