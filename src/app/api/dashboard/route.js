import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const products = await prisma.product.count({where: {deleted_at: null}});
        const orders = await prisma.order.count();

        return Response.json({message: "Successfully fetched dashboard data!", products, orders});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something wen't wrong, please try again later."}, {status: 500});
    }
}