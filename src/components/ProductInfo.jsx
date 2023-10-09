'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useCartStore from '@/context/store';
import StarRating from './StarRating';

export default function ProductInfo({ product }) {
    const [mainImage, setMainImage] = useState(product?.images[0]?.url);
    const addToCart = useCartStore((state) => state?.addToCart);

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    function handleChangeImage(image) {
        setMainImage(image?.url);
    }

    return (
        <div className="bg-gray-400 min-h-screen">
            <div className="max-container">
                <div className="pt-10">
                    <div className="grid grid-cols-[0.8fr,1.2fr] max-sm:grid-cols-1 max-lg:px-4 gap-10 ">
                        <div className="flex flex-col gap-4 justify-center items-center max-w-full p-3 bg-white rounded">
                            <Image
                                key={product?.images[0]?.public_id}
                                src={mainImage}
                                alt={product?.images[0]?.filename}
                                width={200}
                                height={200}
                            />
                            <div className="flex gap-2">
                                {product.images.map((image) => (
                                    <button
                                        key={image?.public_id}
                                        className="border border-gray-300"
                                        onClick={() => handleChangeImage(image)}
                                    >
                                        <Image
                                            src={image?.url}
                                            alt={image?.filename}
                                            width={100}
                                            height={100}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded p-6 flex flex-col gap-4">
                            <h1>{product?.title}</h1>
                            <p className="text-justify">
                                {product?.description}
                            </p>

                            <div className="flex justify-between items-center">
                                <p className=" text-4xl font-bold">
                                    {product?.price}$
                                </p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-blue-900 text-white text-xl w-[70%] py-1 px-2 rounded-lg border"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-2xl py-4">
                        <h2>Ratings</h2>
                        <StarRating />
                    </div>
                </div>
            </div>
        </div>
    );
}
