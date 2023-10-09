'use client';
import Image from 'next/image';
import useCartStore from '@/context/store';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Product({ product }) {
    const addToCart = useCartStore((state) => state?.addToCart);

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    return (
        <section className="grid grid-cols-1 perspective-800">
            <div className="flex flex-1 flex-col justify-around text-center pb-3 hover:transform hover:translate-z-8 drop-shadow-xl rounded-lg w-full bg-white">
                <div className="flex justify-center items-center max-w-full h-40">
                    <Link href={'/products/product/' + product?._id}>
                        <Image
                            src={product?.images[0]?.url}
                            alt={product?.images[0]?.filename}
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <h2 className="">{product.title}</h2>
                <p className="text-lg font-bold">{product.price}$</p>
                <div className="flex justify-center">
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-900 text-white text-xl w-[70%] py-1 px-2 rounded-lg border"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </section>
    );
}
