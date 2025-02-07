import { faker } from "@faker-js/faker";
import { AuthProviderType, PrismaClient, RoleType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Sowing seeds...");

  await prisma.user.create({
    data: {
      firstname: "Admin",
      lastname: "User",
      email: "admin@example.com",
      username: "admin",
      password: bcrypt.hashSync("Admin123.", 10),
      authProvider: AuthProviderType.CREDENTIAL,
      emailVerified: new Date(),
      roles: [RoleType.ADMIN],
    },
  });

  for (let i = 0; i < 15; i++) {
    await prisma.company.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        enabled: i % 7 !== 0,
      },
    });
  }

  console.log("Seeds sown!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
