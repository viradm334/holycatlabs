import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    const {userId} = await params;

    try{
        const orders = await prisma.order.findmany({
            where: {
                userId
            }
        });

        return Response.json({message: "Successfully get all orders!", success: true, orders});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}