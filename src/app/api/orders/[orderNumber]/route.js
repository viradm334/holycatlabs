import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    const {orderNumber} = await params;
    try{
        const order = await prisma.order.findUnique({
            where: {
                orderNumber
            },
            include: {
                orderItems: {
                    select:{
                        quantity: true,
                        price: true,
                        product: {
                            select:{
                                name: true,
                                imageUrl: true,
                                slug: true
                            }
                        }
                    }
                }
            }
        });

        if(!order){
            return Response.json({message: "Order not found!"}, {status: 404});
        };

        const totalPrice = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderWithTotal = {...order, totalPrice}

        return Response.json({message: "Successfully get all products!", success: true, orderWithTotal});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}