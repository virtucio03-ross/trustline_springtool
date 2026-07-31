import { prisma } from "./prisma.js";

const records = [
  {
    "id": "TRUSTLINE-SPRING-001",
    "name": "payments pilot lane",
    "status": "READY_FOR_QUOTE",
    "amount": 125.5,
    "score": 88,
    "destination": "GBYH3E4WVFMKXJX6K6J4N5QPRZ2VQF5L6J2K3M4N5P6Q7R8S9T0U1V2"
  },
  {
    "id": "TRUSTLINE-SPRING-002",
    "name": "settlement score verification",
    "status": "AWAITING_SIGNATURE",
    "amount": 310.25,
    "score": 76,
    "destination": "GDMQ4W6ZK7P2V5S8T1U3X9Y4A6B8C2D5E7F9G1H3J5K7L9M2N4P6Q8"
  },
  {
    "id": "TRUSTLINE-SPRING-003",
    "name": "community settlement proof",
    "status": "ON_CHAIN_READY",
    "amount": 540,
    "score": 93,
    "destination": "GCR5T7V9X2Z4B6D8F1H3J5L7N9P2R4T6V8X1Z3B5D7F9H2J4L6N8"
  }
];

async function main() {
  for (const record of records) {
    await prisma.workflowRecord.upsert({
      where: { id: record.id },
      update: record,
      create: record,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
