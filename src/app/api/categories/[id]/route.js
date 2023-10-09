import { Category } from '@/models/Category';
import dbConnect from '@/dbConfig/dbConnect';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params: { id } }) {
    await dbConnect();

    try {
        if (!id) {
            return NextResponse.json('Category ID Required', {
                status: 400,
            });
        }
        const category = await Category.findById(id).exec();
        if (!category) {
            return NextResponse.json('Category not found', {
                status: 400,
            });
        }

        const result = await category.deleteOne();

        return NextResponse.json(`Category ${result.name} deleted`);
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
