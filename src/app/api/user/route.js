import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const users = await prisma.user.findMany();

        return Response.json({message: "Successfully get users!", success: true, users});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}