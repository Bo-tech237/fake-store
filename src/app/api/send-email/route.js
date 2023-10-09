import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';
import { randomUUID } from 'crypto';

const mailjet = new Mailjet({
    apiKey: process.env.MJ_API_KEY,
    apiSecret: process.env.MJ_API_SECRET,
});

export async function POST(request) {
    const { email } = await request.json();
    await dbConnect();

    try {
        if (!email) {
            return NextResponse.json('Invalid email', {
                status: 400,
            });
        }
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return NextResponse.json('This email is not registered', {
                status: 400,
            });
        }

        const accessToken = `${randomUUID()}${randomUUID()}`.replace(/-/g, '');

        user.passwordResetToken.token = accessToken;
        user.passwordResetToken.createdAt = new Date();

        const updateUser = await user.save();

        const data = {
            Messages: [
                {
                    From: {
                        Email: 'arnaudtechnology@gmail.com',
                        Name: 'FAKE STORE',
                    },
                    To: [
                        {
                            Email: user?.email,
                        },
                    ],
                    Subject: 'Reset Password request',
                    HTMLPart: `<h2>Hello ${user?.username}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, please click here: 
                    <a href="http://localhost:3000/account/password-reset/${accessToken}">Reset Password</a>
                    <br/>
                    For security reasons, this link is only valid for four hours.<br/>
                        
                    If you did not request this reset, please ignore this email.</h2>`,
                },
            ],
        };

        const mailjetResponse = await mailjet
            .post('send', { version: 'v3.1' })
            .request(data);

        console.log('EmailSent: ', updateUser);

        return NextResponse.json(mailjetResponse?.response?.data);
    } catch (error) {
        console.log('sentEmailError', error);
        return NextResponse.json(error.message, { status: 500 });
    }
}
