import { makeUniqueProductSlug } from "@/lib/makeUniqueProductSlug";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function PUT(req, {params}){
    try{
        const {slug} = await params;
        const body = await req.json();
        const {name, price, categoryId, description, stock, public_id, imageUrl} = body;

        const existingProduct = await prisma.product.findUnique({where: {slug}});

        const shouldUpdateSlug = name !== existingProduct.name;
        
        const baseSlug = slugify(name, {lower: true, strict: true, trim: true});
        const uniqueSlug = await makeUniqueProductSlug(baseSlug);

        const updateData = {
            name,
            ...(shouldUpdateSlug && { slug: uniqueSlug }),
            price: Number(price),
            categoryId,
            description,
            stock: Number(stock),
            imageUrl,
            public_id,
            updated_at: new Date()
          }

        const updated = await prisma.product.update({
            where: {slug},
            data: updateData
        });

        return Response.json({message: "Successfully updated product data!", data: updated});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}