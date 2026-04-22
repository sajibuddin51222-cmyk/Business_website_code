import prisma from "./lib/db";

async function main() {
  console.log("Prisma keys:", Object.keys(prisma));
  // Filter for properties that look like models (starting with lowercase)
  const models = Object.keys(prisma).filter(k => !k.startsWith("_") && typeof (prisma as any)[k] === "object");
  console.log("Model-like properties:", models);
}

main().catch(console.error);
