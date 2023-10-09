import { v2 as cloudinary } from 'cloudinary';

function uploads(file, folder) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            function (error, result) {
                if (result) {
                    resolve({ public_id: result.public_id, url: result.url });
                } else {
                    console.log('error:', error);
                }
            },
            { resource_type: auto, folder: folder }
        );
    });
}

export async function getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: 'next' },
        cloudinaryConfig.api_secret
    );

    return { timestamp, signature };
}

export async function saveToDatabase({ public_id, version, signature }) {
    // verify the data
    const expectedSignature = cloudinary.utils.api_sign_request(
        { public_id, version },
        cloudinaryConfig.api_secret
    );

    if (expectedSignature === signature) {
        // safe to write to database
        console.log({ public_id });
    }
}

export { uploads };
