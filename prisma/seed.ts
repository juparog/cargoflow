import { faker } from "@faker-js/faker";
import {
  AuthProviderType,
  PrismaClient,
  RoleType,
  TransportRecordMovementType,
  TransportRecordStatusType,
  VehicleType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Sowing seeds...");

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      firstname: "Admin",
      lastname: "User",
      email: "admin@example.com",
      username: "admin",
      password: bcrypt.hashSync("Admin123.", 10),
      authProvider: AuthProviderType.CREDENTIAL,
      emailVerified: new Date(),
      image: faker.image.avatarGitHub(),
      roles: [RoleType.ADMIN],
    },
  });

  // Create normal user
  const normaluser = await prisma.user.create({
    data: {
      firstname: "Normal",
      lastname: "User",
      email: "normaluser@example.com",
      username: "normaluser",
      password: bcrypt.hashSync("Normal123.", 10),
      authProvider: AuthProviderType.CREDENTIAL,
      emailVerified: new Date(),
      image: faker.image.avatar(),
      roles: [RoleType.USER],
    },
  });

  // Create companies
  const companies = [];
  for (let i = 0; i < 15; i++) {
    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        image: faker.image.urlLoremFlickr({ category: "business" }),
        enabled: i % 7 !== 0,
      },
    });
    companies.push(company);
  }

  // Create vehicles
  const vehicles = [];
  for (let i = 0; i < 31; i++) {
    const vehicle = await prisma.vehicle.create({
      data: {
        name: faker.vehicle.vehicle(),
        licensePlate: faker.vehicle.vrm(),
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        type: VehicleType.TRUCK,
        image: faker.image.urlLoremFlickr({ category: "transport" }),
        enabled: i % 7 !== 0,
      },
    });
    vehicles.push(vehicle);
  }

  // transport routes
  const transportRoutes = [];
  for (let i = 0; i < 4; i++) {
    const transportRoute = await prisma.transportRoute.create({
      data: {
        name: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        image: faker.image.urlLoremFlickr({ category: "transport" }),
        enabled: i % 7 !== 0,
      },
    });
    transportRoutes.push(transportRoute);
  }

  // transport record
  const transportRecords = [];
  for (let i = 0; i < 31; i++) {
    const transport = await prisma.transportRecord.create({
      data: {
        routeId: transportRoutes[i % 4].id,
        vehicleId: vehicles[i].id,
        driverId: admin.id,
        status: TransportRecordStatusType.PENDING,
        notes: [faker.lorem.paragraph(), faker.lorem.paragraph()],
        initialAmount: Number(faker.finance.amount()),
        movements: {
          create: [
            {
              amount: Number(faker.finance.amount()),
              description: faker.finance.transactionType(),
              images: [faker.image.dataUri()],
            },
            {
              amount: Number(faker.finance.amount()),
              description: faker.finance.transactionType(),
              type: TransportRecordMovementType.INCOMING,
              images: [faker.image.dataUri()],
            },
          ],
        },
      },
    });
    transportRecords.push(transport);

    const movements = await prisma.transportRecordMovement.findMany({
      where: { transportId: transport.id },
    });

    // create history
    await prisma.transportRecordHistory.createMany({
      data: [
        // status
        {
          transportId: transport.id,
          oldValue: "unsaved",
          newValue: TransportRecordStatusType.PENDING,
          changedBy: admin.id,
        },
        // initial amount
        {
          transportId: transport.id,
          oldValue: `0.00`,
          newValue: `Initial amount $ ${transport.initialAmount}`,
          changedBy: normaluser.id,
        },
        // movements
        {
          transportId: transport.id,
          oldValue: "unsaved",
          newValue: `Outgoing $ ${movements[0].amount}`,
          changedBy: admin.id,
        },
        {
          transportId: transport.id,
          oldValue: "unsaved",
          newValue: `Incoming $ ${movements[1].amount}`,
          changedBy: admin.id,
        },
      ],
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
