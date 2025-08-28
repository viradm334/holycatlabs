import prisma from "@/lib/prisma";

export async function PATCH(req, {params}){
    const {id} = await params;

    try{
        const deleted = await prisma.product.update({
            where: {id},
            data: {
                deleted_at: new Date()
            }
        })

        return Response.json({message: "Successfully deleted product!", success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}