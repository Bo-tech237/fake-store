import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function GET() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
            folder: 'fake-store',
        },
        cloudinaryConfig.api_secret
    );

    return NextResponse.json({ timestamp, signature });
}
export async function POST(request) {
    const { public_id, version, signature, url, filename } =
        await request.json();

    // verify the data
    const expectedSignature = cloudinary.utils.api_sign_request(
        { public_id, version },
        cloudinaryConfig.api_secret
    );

    if (expectedSignature === signature) {
        console.log('signature verified');
        return NextResponse.json({ public_id, url, filename });
    }
}
