import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const categories = await prisma.category.findMany();

        return Response.json({message: "Successfully get all categories!", success: true, categories});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}