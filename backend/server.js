import e from "express"
import { listEvents } from "./dbOps.js"

const app = e()

app.get("/",(req,res)=>{
    res.send("Express working")
})

app.get("/listEvents",(req,res)=>{
    listEvents().then((data)=>{
        console.log(data)
        res.send(data)
    })
})

app.listen(8000,()=>{
    console.log("listening....")
})
