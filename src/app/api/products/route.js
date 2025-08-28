import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const products = await prisma.product.findMany({
            where: {
                deleted_at: null,
                stock: {
                    gt: 0
                }
            }
        });

        return Response.json({message: "Successfully get all products!", success: true, products});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}