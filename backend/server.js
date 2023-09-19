import e from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv/config.js"
import { listEvents } from "./dbOps.js"

const app = e()
app.use(cors())
app.use(e.json())
app.use(cookieParser())

function verifyRequest(req,res,next){
    const token = req.headers["authorization"].split(" ")[1]
    try{
        const user = verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    }
    catch{
        res.status(401).send("Unautorised")
    }

}

app.get("/",(req,res)=>{
    res.send("Express working")
})

app.post("/login",(req,res)=>{
    
})

app.get("/listEvents",(req,res)=>{
    listEvents().then((data)=>{
        console.log(data)
        res.json(data)
    })
})

app.listen(8000,()=>{
    console.log("listening....")
})
