'use client';
import Image from 'next/image';
import useCartStore from '@/context/store';
import { useEffect, useState } from 'react';

export default function FeaturedProduct({ product }) {
    const [isAdded, setIsAdded] = useState(false);
    const addToCart = useCartStore((state) => state?.addToCart);

    function handleAddToCart() {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 1000);
    }

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    return (
        <div className="flex justify-between items-center my-3 max-lg:flex-col-reverse gap-12 w-full">
            <div className="flex flex-1 flex-col">
                <h2 className=" font-bold text-4xl mb-2 lg:max-w-lg">
                    {product?.title}
                </h2>
                <p className="lg:max-w-lg text-justify text-gray-300 leading-7">
                    {product?.description}
                </p>
                <div className="">
                    <button
                        onClick={() => handleAddToCart()}
                        disabled={isAdded}
                        className={`bg-white mt-5 text-black text-xl py-1 px-2 rounded-lg border border-cyan-600 ${
                            isAdded && ' bg-green-700'
                        }`}
                    >
                        {!isAdded ? 'Add to cart' : '✔added'}
                    </button>
                </div>
            </div>
            <div className="flex-1">
                {product?.images.map((image) => (
                    <div
                        className="flex justify-end items-center"
                        key={image?.public_id}
                    >
                        <Image
                            src={image?.url}
                            alt={image?.filename}
                            width={300}
                            height={100}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
