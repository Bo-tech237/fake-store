import dbConnect from '@/dbConfig/dbConnect';
import { NextResponse } from 'next/server';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';

export async function GET() {
    const users = await User.find().select('-password').lean();
    return NextResponse.json({
        users,
    });
}
export async function POST(request) {
    await dbConnect();
    const { username, email, password } = await request.json();
    try {
        if (!username || !email || !password) {
            return NextResponse.json('All fields are required', {
                status: 400,
            });
        }

        const duplicate = await User.findOne({ email }).exec();
        if (duplicate) {
            return NextResponse.json('Duplicate email', {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            return NextResponse.json('New user created', {
                status: 201,
            });
        } else {
            return NextResponse.json('Invalid user data received', {
                status: 400,
            });
        }
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
export async function PUT(request) {}
export async function DELETE() {}
