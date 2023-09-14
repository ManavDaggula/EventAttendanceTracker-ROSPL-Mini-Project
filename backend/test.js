import { addEvents, deleteEvent, endEvent, generateCode, listEvents, listRegisteredAttendee, listRunningEvents, startEvent } from "./dbOps.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
// listEvents().then(console.log)
listRegisteredAttendee("Git and GitHub", verified=true).then(console.log)
// console.log(await generateCode("Git and GitHub"))
// listRunningEvents().then(console.log)
// endEvent("Git and GitHub").then(console.log)