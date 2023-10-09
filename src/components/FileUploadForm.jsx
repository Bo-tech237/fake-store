'use client';
import { useState } from 'react';
import CustomFileSelector from './CustomFileSelector';
import ImagePreview from './ImagePreview';
import axios from 'axios';

const FileUploadForm = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleFileSelected = (e) => {
        if (e.target.files) {
            //convert `FileList` to `File[]`
            // const filesArray = Array.from(e.target.files);
            console.log('file', e.target.files[0]);

            setImages(() => [e.target.files[0]]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!images) return;

        const signatureResponse = await axios.get('/api/cloudinary');

        const formData = new FormData();

        formData.append('file', images[0]);
        formData.append('api_key', '523435923248467');
        formData.append('signature', signatureResponse?.data?.signature);
        formData.append('timestamp', signatureResponse?.data?.timestamp);
        formData.append('folder', 'fake-store');

        formData && console.log('form', formData.get('file'));

        const cloudinaryResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/web-solutions/auto/upload',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );

        cloudinaryResponse?.status === 200
            ? setUploading(false)
            : setUploading(true);
        console.log('cloudresponse:', cloudinaryResponse.data);

        const photoData = {
            public_id: cloudinaryResponse?.data?.public_id,
            version: cloudinaryResponse?.data?.version,
            signature: cloudinaryResponse?.data?.signature,
            url: cloudinaryResponse?.data?.secure_url,
        };

        const databaseResponse = await axios.post('/api/cloudinary', photoData);
        console.log('database', databaseResponse.data);
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <CustomFileSelector
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelected}
                />
                <button
                    type="submit"
                    className="bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md"
                    disabled={uploading === true ? true : false}
                >
                    {uploading === true ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            <ImagePreview images={images} />
        </form>
    );
};

export default FileUploadForm;
