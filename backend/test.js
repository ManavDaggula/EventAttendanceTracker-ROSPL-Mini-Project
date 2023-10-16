import { addEvents, checkAttendeeStatus, deleteEvent, endEvent, generateCode, getAttendee, listEvents, listRegisteredAttendee, listRunningEvents, newAttendee, startEvent, verifyAttendee } from "./dbOps.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
// listEvents().then(console.log)


// listRegisteredAttendee("Robotics Competition").then(console.log)
// newAttendee("George Test", "703", "I.T.", "B.E.", "A", "Blockchain and Cryptocurrency Workshop").then(console.log).catch(err=>console.log(err))
// await verifyAttendee("Robotics Competition","MRH1")
// console.log(await getAttendee("Blockchain and Cryptocurrency Workshop", "T228"))
console.log(await checkAttendeeStatus("Blockchain and Cryptocurrency Workshop", "George Test", "703", "A", "B.E.", "I.T.", "G2S7"))