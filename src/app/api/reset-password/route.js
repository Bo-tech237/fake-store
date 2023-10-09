import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();

    const users = await User.find().exec();

    try {
        if (!users?.length) {
            return NextResponse.json('No user found', {
                status: 400,
            });
        }

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
