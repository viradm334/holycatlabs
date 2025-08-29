import prisma from "@/lib/prisma";

export async function GET(req) {
  // search params
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;
  const whereClause = {
    deleted_at: null,
    stock: {
      gt: 0,
    },
  };

  if (categorySlug)
    whereClause.category = {
      slug: categorySlug,
    };
  try {
    const products = await prisma.product.findMany({
      where: whereClause,
      skip,
      take: limit,
    });

    const total = await prisma.product.count({ where: whereClause });

    return Response.json({
      message: "Successfully get all products!",
      success: true,
      products,
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
