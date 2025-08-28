import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      userId,
      address,
      city,
      province,
      products, // [{ productId, quantity }]
      phoneNumber,
      email,
      paymentMethod,
      cartId,
    } = body;

    const orderNumber = `ORD-${Date.now()}`;
    const productIds = products.map((p) => p.productId);

    await prisma.$transaction(async (tx) => {
      // 1. Fetch product records
      const productRecords = await tx.product.findMany({
        where: { id: { in: productIds } },
      });

      // 2. Validate stock
      for (const item of products) {
        const record = productRecords.find((p) => p.id === item.productId);
        if (!record) {
          throw new Error(`Produk tidak ditemukan: ${item.productId}`);
        }
        if (record.stock < item.quantity) {
          throw new Error(`Stok untuk produk ${record.name} tidak mencukupi`);
        }
      }

      // 3. Create order + orderItems
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId,
          email,
          phoneNumber,
          address,
          city,
          province,
          paymentMethod,
          orderItems: {
            create: products.map((item) => {
              const record = productRecords.find(
                (p) => p.id === item.productId
              );
              return {
                productId: item.productId,
                quantity: item.quantity,
                price: record?.price ?? 0,
              };
            }),
          },
        },
      });

      // 4. Decrement product stock
      await Promise.all(
        products.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          })
        )
      );

      // 5. Remove items from cart
      await tx.cartItem.deleteMany({
        where: {
          cartId,
          productId: { in: productIds },
        },
      });
    });

    return Response.json({
      message: "Berhasil membuat pesanan!",
      orderNumber,
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
