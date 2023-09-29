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
    name: "Robotics Competition",
    startTime: new Date(),
  },
});
await prisma.events.create({
  data: {
    name: "Space Exploration Seminar",
    startTime: new Date(),
  },
});
await prisma.events.create({
  data: {
    name: "Blockchain and Cryptocurrency Workshop",
    startTime: new Date(),
  },
});
