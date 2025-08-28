import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();

  const { name, email, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cart: {
          create: {},
        },
      },
    });

    return Response.json({
      message: "Successfully created new accoun!",
      success: true,
      user,
    });
  } catch (err) {
    console.error(err.message);
    if (err.code === "P2002") {
      return Response.json(
        { message: "Email is already exists, please use a different one!" },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
