import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const orders = await prisma.order.findMany();

        return Response.json({message: "Successfully get all products!", success: true, orders});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}