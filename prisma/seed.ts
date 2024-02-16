import { prisma } from "../models";
// import {
//   seeders jsons
// } from "./seeders";

const seeders = [
// imported seeders
];

async function seed() {
  for (const seeder of seeders) {
    try {
      console.log("🦦 seeder: ", seeder)
      await seeder();
    } catch (error) {
      console.error("🚨 Error while seeding DB: ", error);
    }
  }

  await prisma.$disconnect();
}

seed();
