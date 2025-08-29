import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { userId } = await params;

  const limit = 10;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: {
            select: {
                quantity: true,
                price: true,
                product: {
                    select: {
                        name: true,
                        imageUrl: true,
                        slug: true
                    }
                }
            }
        }
      },
      skip,
      take: limit,
    });

    const total = await prisma.order.count();

    return Response.json({
      message: "Successfully get all orders!",
      success: true,
      orders,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err.message);
    return Response.json(
      { message: "Something went wrong, please try again later." },
      { status: 500 }
    );
  }
}
