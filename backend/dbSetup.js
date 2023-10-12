import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

// Clearing database
await prisma.admins.deleteMany();
console.log("Admin users cleared.");
await prisma.record.deleteMany();
console.log("Records cleared.");
await prisma.events.deleteMany();
console.log("Events cleared.");

bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10, (err, hashed) => {
  if (err) {
    console.log("Error!");
  } else {
    prisma.admins
      .create({
        data: {
          username: process.env.DEFAULT_ADMIN_USERNAME,
          password: hashed,
        },
      })
      .then((x) => console.log("Created first admin."));
  }
});

await prisma.events.create({
  data: {
    id: 1,
    name: "Robotics Competition",
    startTime: new Date("09/01/2023 11:00 +05:30"),
    endTime: new Date("09/01/2023 12:00 +05:30"),
  },
});
await prisma.events.create({
  data: {
    id: 2,
    name: "Space Exploration Seminar",
    startTime: new Date("09/02/2023 11:00 +05:30"),
    endTime: new Date("09/02/2023 12:00 +05:30"),
  },
});
await prisma.events.create({
  data: {
    id: 3,
    name: "Blockchain and Cryptocurrency Workshop",
    startTime: new Date(),
  },
});

const records = [
  {
    id: "621aec04-c7f3-49f4-a225-b58c5565a15c",
    name: "John Doe",
    department: "I.T.",
    div: "A",
    roll: "303",
    year: "S.E.",
    eventsId: 1,
    logTime: new Date("09/01/2023 11:30 +05:30"),
  },
  {
    id: "9912249c-6045-4101-8e58-456097482465",
    name: "Lucy Brown",
    department: "I.T.",
    div: "A",
    roll: "503",
    year: "T.E.",
    eventsId: 2,
    logTime: new Date("09/01/2023 11:30 +05:30"),
  },
  {
    id: "4e315699-2505-4287-8712-924a01c3c7c4",
    name: "Clark Kent",
    department: "C.S.",
    div: "A",
    roll: "007",
    year: "S.E.",
    eventsId: 1,
    logTime: new Date("10/12/2023 11:30 +05:30"),
  },
]

records.forEach(async (r)=>{
  await prisma.record.create({
    data:r
  })
})
