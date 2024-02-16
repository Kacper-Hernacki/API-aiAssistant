import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const {
  message_history,
  resources,
  skills,
  notes
} = prisma;

export {
  prisma,
  message_history,
  resources,
  skills,
  notes
}