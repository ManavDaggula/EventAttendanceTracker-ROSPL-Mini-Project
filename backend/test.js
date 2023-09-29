import { addEvents, deleteEvent, endEvent, generateCode, listEvents, listRegisteredAttendee, listRunningEvents, startEvent } from "./dbOps.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
// listEvents().then(console.log)
