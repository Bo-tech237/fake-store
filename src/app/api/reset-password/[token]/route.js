import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request, { params: { token } }) {
    const { password, confirmPassword } = await request.json();
    await dbConnect();

    try {
        if (!password || password !== confirmPassword) {
            return NextResponse.json('Password did not Match', {
                status: 400,
            });
        }

        const user = await User.findOne({
            passwordResetToken: { $exists: true },
            'passwordResetToken.token': token,
            'passwordResetToken.createdAt': {
                $gt: new Date(Date.now() - 1000 * 60 * 60 * 4),
            },
            'passwordResetToken.resetAt': null,
        }).exec();

        if (!user) {
            return NextResponse.json('Invalid token request', {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.passwordResetToken.resetAt = new Date();

        await user.save();

        return NextResponse.json('User password reset with success');
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
