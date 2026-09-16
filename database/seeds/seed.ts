import { seedProjects, seedUsers } from "./data";

async function seed() {
  if (process.env.DEBUG_SEED === "1") {
    console.info("Database seed starting", {
      userCount: seedUsers.length,
      projectCount: seedProjects.length,
    });
  }
}

try {
  await seed();
} catch (error) {
  console.error("Database seed failed:", error);
  process.exit(1);
}
