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

export async function PUT(request) {
    const { id, username, email, password, role } = await request.json();

    await dbConnect();

    try {
        if (!id || !username || !email || !role) {
            return NextResponse.json('All fields are required', {
                status: 400,
            });
        }
        const user = await User.findById(id).exec();
        if (!user) {
            return NextResponse.json('User not found', {
                status: 400,
            });
        }

        const duplicate = await User.findOne({ email }).exec();
        if (duplicate && duplicate._id.toString() !== id) {
            return NextResponse.json('Duplicate email', {
                status: 409,
            });
        }

        user.username = username;
        user.email = email;
        user.role = role;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();

        return NextResponse.json(`${updatedUser.username} updated`);
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
