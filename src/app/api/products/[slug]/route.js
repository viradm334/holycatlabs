import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    const {slug} = await params;

    try{
        const product = await prisma.product.findUnique({where: {slug}});

        if(!product){
            return Response.json({message: "Product not found!"}, {status: 404});
        }

        return Response.json({message: "Successfully get product!", success: true, product});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Something went wrong, please try again later."}, {status: 500});
    }
}