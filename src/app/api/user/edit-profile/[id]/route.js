import prisma from "@/lib/prisma";

export async function PUT(req, {params}){
    try{
        const {id} = await params;
        const body = await req.json();
        const {name, address, city, province, phoneNumber, email, postal_code} = body;

        const updated = await prisma.user.update({
            where: {id},
            data: {
                name,
                address,
                email,
                city,
                province,
                phoneNumber,
                postal_code
            }
        });

        return Response.json({message: "Successfully updated profile!", user: updated});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}