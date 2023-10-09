'use client';
import useCartStore from '@/context/store';
import Image from 'next/image';
import { useEffect } from 'react';

export default function CartInfo() {
    const cartItems = useCartStore((state) => state?.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    return (
        <div className=" bg-gray-400 min-h-screen">
            <div className="max-container pt-6">
                <div
                    className={!cartItems?.length ? 'grid-cart1' : 'grid-cart2'}
                >
                    <div className=" bg-white flex flex-col gap-6 rounded-lg p-4 border border-white">
                        <div className="flex gap-2 justify-between mb-5">
                            <h1 className="">Shopping Cart</h1>
                            <button
                                className=" bg-red-500 rounded py-1 px-2"
                                onClick={() => clearCart()}
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 my-0 mx-auto">
                            {!cartItems?.length && (
                                <h1>Your shopping cart is empty</h1>
                            )}
                        </div>
                        <div className="flex flex-col justify-center">
                            {cartItems?.length > 0 && (
                                <table className="basic">
                                    <thead>
                                        <tr>
                                            <th className="text-left">
                                                product
                                            </th>
                                            <th className="text-left">
                                                quantity
                                            </th>
                                            <th className="text-right">
                                                price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            {cartItems.map((product) => (
                                                <tr
                                                    className=""
                                                    key={product._id}
                                                >
                                                    <td>
                                                        <Image
                                                            src={
                                                                product
                                                                    ?.images[0]
                                                                    .url
                                                            }
                                                            alt={product?.title}
                                                            width={100}
                                                            height={100}
                                                        />
                                                        <h2 className="">
                                                            {product?.title}
                                                        </h2>
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button
                                                                className="btn"
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        product
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <div className="">
                                                                {
                                                                    product?.quantity
                                                                }
                                                            </div>
                                                            <button
                                                                className="btn"
                                                                onClick={() =>
                                                                    addToCart(
                                                                        product
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-right">
                                                        <div className="">
                                                            $
                                                            {product?.price *
                                                                product?.quantity}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="">
                                                <td>
                                                    {cartItems?.length === 1
                                                        ? `${cartItems?.length} item`
                                                        : `${cartItems?.length} items`}
                                                </td>
                                                <td> Sub-Total</td>
                                                <td className=" text-right">
                                                    ${cartTotal}
                                                </td>
                                            </tr>
                                        </>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    {!!cartItems?.length && (
                        <div className=" bg-white flex flex-col gap-4 justify-center rounded-lg p-4 border border-white">
                            <h1 className="text-center">Order informations</h1>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="text" placeholder="City" />
                            <input type="text" placeholder="Postal Code" />
                            <input type="text" placeholder="Street Address" />
                            <input type="text" placeholder="Country" />
                            <button className="btn w-full">Checkout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
