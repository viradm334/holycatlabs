import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const name = searchParams.get("name");

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  // where clause
  const whereClause = { deleted_at: null };
  if (categorySlug)
    whereClause.category = {
      slug: categorySlug,
    };
  if (name) whereClause.name = { contains: name };

  try {
    const products = await prisma.product.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        stock: true,
        imageUrl: true,
        slug: true,
        price: true,
        orderItems: {
          select: {
            quantity: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true
          },
        },
      },
      skip,
      take: limit,
    });

    const productsWithSales = products.map((product) => {
      const totalSold = product.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return {
        ...product,
        totalSold,
      };
    });

    const total = await prisma.product.count({ where: whereClause });

    return Response.json({
      message: "Successfully get all products!",
      success: true,
      productsWithSales,
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
