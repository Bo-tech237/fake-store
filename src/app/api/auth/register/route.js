import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

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

export async function POST(request) {
    const { username, email, password } = await request.json();
    await dbConnect();

    try {
        if (!username || !email || !password) {
            return NextResponse.json('All fields are required', {
                status: 400,
            });
        }

        const duplicate = await User.findOne({ email }).lean().exec();
        if (duplicate) {
            return NextResponse.json('Duplicate email', { status: 409 });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const userObject = { username, email, password: hashedPwd };

        const user = await User.create(userObject);
        if (user) {
            NextResponse.json(`New user ${username} created`, { status: 201 });
        } else {
            NextResponse.json('Invalid data received', { status: 400 });
        }
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
