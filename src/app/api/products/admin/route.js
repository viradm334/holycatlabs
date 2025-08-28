import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const products = await prisma.product.findMany({
            include: {
              orderItems: {
                select: {
                  quantity: true
                }
              }
            }
          });

          const productsWithSales = products.map(product => {
            const totalSold = product.orderItems.reduce((sum, item) => sum + item.quantity, 0)
            return {
              ...product,
              totalSold
            }
          })          

        return Response.json({message: "Successfully get all products!", success: true, productsWithSales});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}