import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConnect';
import { v2 as cloudinary } from 'cloudinary';

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function GET(request, { params: { id } }) {
    await dbConnect();

    const products = await Product.findOne({ _id: id }).exec();

    try {
        if (!products) {
            return NextResponse.json('No product found', {
                status: 400,
            });
        }

        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

export async function DELETE(request, { params: { id } }) {
    await dbConnect();

    try {
        if (!id) {
            return NextResponse.json('Product ID Required', {
                status: 400,
            });
        }
        const product = await Product.findById(id).exec();
        if (!product) {
            return NextResponse.json('Product not found', {
                status: 400,
            });
        }

        await product?.images.map((image) => {
            return cloudinary.uploader.destroy(image?.public_id);
        });

        const result = await product.deleteOne();

        return NextResponse.json(`Product ${result.title} deleted`);
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
