import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listEvents() {
  return await prisma.events.findMany();
}

async function listRunningEvents(){
  return await prisma.events.findMany({
    where:{
      endTime:null
    }
  })
}

async function addEvents(name, time) {
  return await prisma.events.create({
    data: {
      name: name,
      startTime: time,
    },
  });
}

async function endEvent(name) {
  return await prisma.events.update({
    where: {
      name: name,
    },
    data: {
      endTime: new Date().toISOString(),
    },
  });
}

async function startEvent(name) {
  return await prisma.events.update({
    where: {
      name: name,
    },
    data: {
      startTime: new Date().toISOString(),
      endTime: null,
    },
  });
}

async function deleteEvent(name) {
  return await prisma.events.delete({
    where: {
      name: name,
    },
  });
}

async function generateCode(eventName, len = 4) {
  let recordList = await prisma.events.findUnique({
    where: {
      name: eventName,
    },
    include: {
      Record: {
        select: {
          code: true,
        },
      },
    },
  });
  let codeList = recordList.Record.map((x) => x.code);
  console.log(codeList);
  let sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  while (s.length == 0 || codeList.includes(s)) {
    s = "";
    for (let i = 0; i < len; i++) {
      s += sample[Math.floor(Math.random() * sample.length)];
    }
  }
//   CAUTION: basically here a forever loop can be formed say if all codes are exhausted and no new code is randomly generated, so you can try to implement a limit of tries for generation
  return s
}

async function listRegisteredAttendee(eventName, verified=false){
  let event = await prisma.events.findUnique({
    where:{
      name:eventName
    }
  })
  let registeredAttendees
  if(verified){
    registeredAttendees = await prisma.record.findMany({
      where:{
        event:event,
        code:null,
      }
    })
  }
  else{
    registeredAttendees = await prisma.record.findMany({
      where:{
        event:event
      }
    })
  }
  // console.log(event.Record)
  return registeredAttendees
}

export {
  listEvents,
  listRunningEvents,
  addEvents,
  startEvent,
  endEvent,
  deleteEvent,
  generateCode,
  listRegisteredAttendee
};
