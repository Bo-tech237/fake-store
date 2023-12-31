'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function NewProduct() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setprice] = useState('');
    const [images, setImages] = useState([]);
    const [file, setFile] = useState('');
    const [upload, setUpload] = useState(false);
    const [create, setCreate] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productProperties, setProductProperties] = useState({});
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios
            .get('/api/categories')
            .then((response) => setCategories(response?.data?.categories));
    }, []);

    async function createProduct(e) {
        e.preventDefault();
        if (!images) return;
        try {
            setCreate(true);

            const data = {
                title,
                description,
                price,
                images,
                category,
                properties: productProperties,
            };

            const response = await axios.post('/api/products', data);
            if (response.status === 201) {
                setCreate(false);
                router.push('/dashboard/products');
                router.refresh();
            }
        } catch (error) {
            console.log('error', error);
            setCreate(false);
        }
    }

    async function handleUpload() {
        if (!file) return;
        try {
            setUpload(true);
            const signatureResponse = await axios.get('/api/cloudinary');

            const formData = new FormData();

            formData.append('file', file);
            formData.append('api_key', '523435923248467');
            formData.append('signature', signatureResponse?.data?.signature);
            formData.append('timestamp', signatureResponse?.data?.timestamp);
            formData.append('folder', 'fake-store');

            const cloudinaryResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/web-solutions/auto/upload',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            const photoData = {
                public_id: cloudinaryResponse?.data?.public_id,
                version: cloudinaryResponse?.data?.version,
                signature: cloudinaryResponse?.data?.signature,
                url: cloudinaryResponse?.data?.secure_url,
                filename: cloudinaryResponse?.data?.original_filename,
            };

            const checkedSignatureResponse = await axios.post(
                '/api/cloudinary',
                photoData
            );

            setImages((prevImage) => [
                ...prevImage,
                checkedSignatureResponse?.data,
            ]);
            if (checkedSignatureResponse.status === 200) {
                setUpload(false);
                setFile('');
            }
        } catch (error) {
            console.log('error', error);
            setUpload(false);
        }
    }

    function handleFileSelected(e) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        const catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
    }

    function handleProperties(propName, value) {
        setProductProperties((prev) => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    return (
        <div>
            <h1>New Product</h1>
            <form onSubmit={createProduct}>
                <label>Product name</label>
                <input
                    type="text"
                    placeholder="product name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Uncategorized</option>
                    {categories?.length > 0 &&
                        categories.map((category) => (
                            <option key={category?._id} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>
                {propertiesToFill.length > 0 &&
                    propertiesToFill.map((p) => (
                        <div key={p._id}>
                            <label>{p.name}</label>
                            <select
                                value={productProperties[p.name]}
                                onChange={(e) =>
                                    handleProperties(p.name, e.target.value)
                                }
                            >
                                {p?.values.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                <label>Photos</label>
                <div>
                    <div className="flex justify-between">
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleFileSelected}
                            className="file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-4 file:py-2 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400 w-1/2"
                        />
                        <button
                            type="button"
                            className="bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md"
                            disabled={upload}
                            onClick={handleUpload}
                        >
                            {upload ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <div className="grid grid-cols-12 gap-2 my-2">
                        {images.map((image) => {
                            return (
                                <div
                                    className="border border-gray-300"
                                    key={image.public_id}
                                >
                                    <div className="flex justify-center items-center max-w-full">
                                        <Image
                                            src={image.url}
                                            alt={image.filename}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <label>Description</label>
                <textarea
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Price</label>
                <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary" disabled={create}>
                    {create ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    );
}
