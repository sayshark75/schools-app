// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.school.deleteMany();

  // Seed initial schools
  const schools = [
    {
      subdomain: "school1",
      name: "Oakwood Elementary",
      description: "A leading elementary school focused on holistic education",
      contactEmail: "contact@oakwood.edu",
      contactPhone: "(555) 123-4567",
      logo: "/logos/oakwood.png",
      address: "123 Education Lane, Cityville, ST 12345",
    },
    {
      subdomain: "school2",
      name: "Riverdale High School",
      description: "Empowering students for a bright future",
      contactEmail: "info@riverdale.edu",
      contactPhone: "(555) 987-6543",
      logo: "/logos/riverdale.png",
      address: "456 Learning Street, Townsburg, ST 67890",
    },
  ];

  for (const school of schools) {
    await prisma.school.create({ data: school });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
