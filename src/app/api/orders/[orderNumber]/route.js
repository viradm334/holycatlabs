import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    const {orderNumber} = await params;
    try{
        const order = await prisma.order.findUnique({
            where: {
                orderNumber
            }
        });

        return Response.json({message: "Successfully get all products!", success: true, order});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}