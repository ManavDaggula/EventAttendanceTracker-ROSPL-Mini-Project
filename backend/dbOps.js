import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listEvents() {
  return await prisma.events.findMany();
}

async function listRunningEvents() {
  return await prisma.events.findMany({
    where: {
      endTime: null,
    },
  });
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
  // console.log(codeList);
  let sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  while (s.length == 0 || codeList.includes(s)) {
    s = "";
    for (let i = 0; i < len; i++) {
      s += sample[Math.floor(Math.random() * sample.length)];
    }
  }
  //   CAUTION: basically here a forever loop can be formed say if all codes are exhausted and no new code is randomly generated, so you can try to implement a limit of tries for generation
  return s;
}

async function listRegisteredAttendee(eventName, verified = true) {
  let event = await prisma.events.findUnique({
    where: {
      name: eventName,
    },
  });
  if(!event){throw new Error("Event name invalid.")}
  let registeredAttendees;
  if (verified) {
    registeredAttendees = await prisma.record.findMany({
      where: {
        event: event,
        code: null,
      },
      select: {
        name: true,
        div: true,
        year: true,
        department: true,
        logTime: true,
        roll: true,
        code: true,
      }
    });
  } else {
    registeredAttendees = await prisma.record.findMany({
      where: {
        event: event,
      },
      select:{
        id: false,
        name: true,
      }
    });
  }
  // console.log(event.Record)
  return registeredAttendees;
}

async function adminExists(username) {
  let user = await prisma.admins.findUnique({
    where: {
      username: username,
    },
  });
  if(user.length==0){
    throw new Error("User does not exist.");
  }
  return user.password;
}

async function newAttendee(name, roll, department, year, div, eventName){
  if(name && roll && department && year && div && eventName){
    const event = await prisma.events.findUnique({
      where:{
        name: eventName,
        endTime: null
      }
    })
    if(!event){throw new Error("No such running event found.")}
    else{
      try{
        const newCode = await generateCode(eventName);
        const record = await prisma.record.create({
          data:{
            eventsId: event.id,
            name: name,
            year: year,
            div: div,
            roll: roll,
            department: department,
            logTime: new Date(),
            code: newCode,
          }
        })
        return record;
      }
      catch(err){throw new Error("Already registered.")}
    }
  }
  else{
    throw new Error("Missing details to register for attendance.");
  }
}

async function getAttendee(eventName, code){
  if(!eventName || !code){
    throw new Error("Incomplete request.");
  }
  const record = await prisma.record.findFirst({
    where:{
      code: code,
      event:{
        name: eventName
      }
    },
    include:{
      event: true
    }
  })
  if(!record) {
    throw new Error("No such record.");
  }
  return record;
}

async function verifyAttendee(eventName, code){
  if(!eventName || !code){
    throw new Error("Incomplete request.");
  }
  const record = await prisma.record.updateMany({
    where:{
      code: code,
      event:{
        name: eventName
      }
    },
    data: {
      code: null,
      logTime: new Date()
    }
  })
  if(record.count == 0) {
    throw new Error("No such record.");
  }
}

async function checkAttendeeStatus(eventId, attendeeName, roll, div, year, department){
  let status = await prisma.record.findFirst({
    where:{
      eventsId: Number(eventId),
      name: attendeeName,
      roll: roll,
      div: div,
      year: year,
      department: department,
      logTime: {
        gte: new Date(new Date() - (3600*1000))
      }
    }
  })
  if(!status){
    throw new Error("No such record.")
  }
  return !status.code;
}

export {
  listEvents,
  listRunningEvents,
  addEvents,
  startEvent,
  endEvent,
  deleteEvent,
  generateCode,
  listRegisteredAttendee,
  adminExists,
  newAttendee,
  getAttendee,
  verifyAttendee,
  checkAttendeeStatus
};
