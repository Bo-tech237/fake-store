import dbConnect from '@/dbConfig/dbConnect';
import { Category } from '@/models/Category';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();

    try {
        const categories = await Category.find()
            .lean()
            .sort({ createdAt: 'desc' });

        if (!categories?.length) {
            return NextResponse.json('No category found', {
                status: 400,
            });
        }

        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    const { name, properties } = await request.json();
    try {
        if (!name) {
            return NextResponse.json('All fields are required', {
                status: 400,
            });
        }

        const duplicate = await Category.findOne({ name }).exec();
        if (duplicate) {
            return NextResponse.json('Duplicate category name', {
                status: 409,
            });
        }

        const newCategory = await Category.create({
            name,
            properties: properties || undefined,
        });

        if (newCategory) {
            return NextResponse.json('New category created', {
                status: 201,
            });
        } else {
            return NextResponse.json('Invalid category data received', {
                status: 400,
            });
        }
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

export async function PUT(request) {
    const { id, name, properties } = await request.json();

    await dbConnect();

    try {
        if ((!id, !name)) {
            return NextResponse.json('All fields are required', {
                status: 400,
            });
        }
        const category = await Category.findById(id).exec();
        if (!category) {
            return NextResponse.json('Category not found', {
                status: 400,
            });
        }

        const duplicate = await Category.findOne({ name }).exec();
        if (duplicate && duplicate._id.toString() !== id) {
            return NextResponse.json('Duplicate category name', {
                status: 409,
            });
        }

        category.name = name;
        category.properties = properties || undefined;

        const updatedProduct = await category.save();

        return NextResponse.json(`${updatedProduct.name} updated`);
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
