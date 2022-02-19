import { PrismaClient } from "@prisma/client";

export function withMongo(suite: () => void): void {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.genially.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  suite();
}
