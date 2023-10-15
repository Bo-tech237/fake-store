import dbConnect from '@/dbConfig/dbConnect';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();

    await Category.find();
    const products = await Product.find()
        .sort({ createdAt: 'desc' })
        .populate('category')
        .exec();

    try {
        if (!products?.length) {
            return NextResponse.json('No product found', {
                status: 400,
            });
        }

        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

export async function POST(request) {
    const { title, description, price, images, category, properties } =
        await request.json();
    await dbConnect();

    try {
        if (!title || !description || !price || !images.length) {
            return NextResponse.json('All fields are required', {
                status: 400,
            });
        }
        const duplicate = await Product.findOne({ title }).exec();
        if (duplicate) {
            return NextResponse.json('Duplicate product title', {
                status: 409,
            });
        }

        const newProduct = await Product.create({
            title,
            description,
            price,
            images: [...images],
            category: category || undefined,
            properties: properties || undefined,
        });

        if (newProduct) {
            return NextResponse.json('New product created', {
                status: 201,
            });
        } else {
            return NextResponse.json('Invalid product data received', {
                status: 400,
            });
        }
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

export async function PUT(request) {
    const { id, title, description, price, images, category, properties } =
        await request.json();

    await dbConnect();

    try {
        if (!id || !title || !description || !price || !images.length) {
            return NextResponse.json('All fields are required', {
                status: 400,
            });
        }
        const product = await Product.findById(id).exec();
        if (!product) {
            return NextResponse.json('Product not found', {
                status: 400,
            });
        }

        const duplicate = await Product.findOne({ title }).exec();
        if (duplicate && duplicate._id.toString() !== id) {
            return NextResponse.json('Duplicate product title', {
                status: 409,
            });
        }

        product.title = title;
        product.description = description;
        product.price = price;
        product.images = [...images];
        product.category = category || undefined;
        product.properties = properties || undefined;

        const updatedProduct = await product.save();

        return NextResponse.json(`${updatedProduct.title} updated`);
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
