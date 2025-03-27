import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

console.log("Prisma client created successfully.");

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("App is not running and prisma was disconnected.");
    process.exit(0);
})

export default prisma;