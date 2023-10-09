'use client';
import { axiosInstance } from '@/axios/axiosInstance';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeleteProduct({ params: { id } }) {
    const router = useRouter();
    const [product, setProduct] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function getProduct() {
            const response = await axiosInstance.get('/api/products/' + id);

            setProduct(response?.data?.products);
        }
        getProduct();
    }, [id]);

    async function deleteProduct() {
        try {
            setDeleting(true);
            const response = await axiosInstance.delete('/api/products/' + id);
            if (response?.status === 200) {
                setDeleting(false);
                router.push('/dashboard/products');
                router.refresh();
            }
        } catch (error) {
            setDeleting(false);
            console.log('error', error);
        }
    }

    return (
        <>
            <h1 className="text-center text-white text-2xl font-bold py-4 mt-3 mb-4 bg-blue-900">
                Do you really want to delete &nbsp;
                {`"${product?.title}"`}?
            </h1>
            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => router.push('/dashboard/products')}
                    className="bg-gray-500 text-white font-bold text-xl py-3 px-10 mr-2 rounded-md"
                >
                    NO
                </button>
                <button
                    onClick={deleteProduct}
                    disabled={deleting}
                    className="bg-red-800 text-white font-bold text-xl py-3 px-10 mr-2 rounded-md"
                >
                    {deleting ? 'Deleting...' : 'YES'}
                </button>
            </div>
        </>
    );
}
