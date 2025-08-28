import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("havenwear101", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Holycatlabs Admin",
        email: "holycatlabs@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
      },
      {
        name: "Budi",
        email: "budi@gmail.com",
        password: hashedPassword,
        role: "CUSTOMER",
      },
    ],
    skipDuplicates: true
  });

  await prisma.category.createMany({
    data: [
      {
        id: "d2f6d63f-3088-451f-b138-5c3af6431ab3",
        name: "Food & Treats",
        slug: "food-treats",
        imageUrl: "/ctg-food.png"
      },
      {
        id: "5432be12-9419-45ac-a131-c13964bbbaba",
        name: "Accessories",
        slug: "accessories",
        imageUrl: "/ctg-accessories.png"
      },
      {
        id: "5e36a92e-3c45-45d7-b5bb-8bc17e3a30ab",
        name: "Grooming",
        slug: "grooming",
        imageUrl: "/ctg-grooming.png"
      },
      {
        id: "00503929-bd76-4f1d-a516-3bc57929d67e",
        name: "Health & Wellness",
        slug: "health-wellness",
        imageUrl: "/ctg-health.jpg"
      },
    ],
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Meo Tuna",
        slug: "meo-tuna",
        imageUrl: "/meo-tuna.jpg",
        categoryId: "d2f6d63f-3088-451f-b138-5c3af6431ab3",
        description: "Makanan kucing kaleng dengan rasa tuna.",
        price: 25000,
        stock: 100
      },
      {
        name: "Cat Collar Brown",
        slug: "cat-collar-brown",
        imageUrl: "/cat-collar-brown.jpg",
        categoryId: "5432be12-9419-45ac-a131-c13964bbbaba",
        description: "Kalung kucing warna coklat dengan rantai.",
        price: 30000,
        stock: 100
      },
      {
        name: "Pet Soap",
        slug: "pet-soap",
        imageUrl: "/pet-soap.jpg",
        categoryId: "5e36a92e-3c45-45d7-b5bb-8bc17e3a30ab",
        description: "Sabun kucing yang harum dan membuat bulu lembut.",
        price: 20000,
        stock: 100
      },
      {
        name: "Obat Kutu",
        slug: "obat-kutu",
        imageUrl: "/obat-kutu.png",
        categoryId: "00503929-bd76-4f1d-a516-3bc57929d67e",
        description: "Obat kutu yang ampuh untuk semua binatang.",
        price: 45000,
        stock: 100
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log("Seeding done");
    await prisma.$disconnect;
  })
  .catch(async (err) => {
    console.error(err.message);
    await prisma.$disconnect;
    process.exit(1);
  });