import { seedProjects, seedUsers } from "./data";

async function seed() {
  console.log("Starting database seed...");

  console.log("Users:", seedUsers);
  console.log("Projects:", seedProjects);

  console.log("Database seed completed.");
}

seed().catch((error) => {
  console.error("Database seed failed:", error);
  process.exit(1);
});
