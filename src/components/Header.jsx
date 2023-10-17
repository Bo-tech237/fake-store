'use client';
import Link from 'next/link';
import useCartStore from '@/context/store';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const cart = useCartStore((state) => state?.cart);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const currentRoute = usePathname();

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [currentRoute, setMobileMenuOpen]);

    return (
        <header className="bg-black  fixed w-full z-20 top-0 left-0 ">
            <nav className="max-container">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
                    <Link href="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                            Fake Store
                        </span>
                    </Link>
                    <div className="flex space-x-6 md:order-2">
                        <Link
                            href={'/user-auth/login'}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </Link>
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <span className="text-6xl">&times;</span>
                            ) : (
                                <span className="text-4xl">&#9776;</span>
                            )}
                        </button>
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="navbar-sticky"
                    >
                        <section className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <Link
                                href={'/'}
                                className={`block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:hover:text-blue-300 ${
                                    currentRoute === '/'
                                        ? 'text-blue-700'
                                        : 'text-white'
                                }`}
                                //aria-current="page"
                            >
                                Home
                            </Link>

                            <Link
                                href={'/products'}
                                className={`block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:hover:text-blue-300 ${
                                    currentRoute === '/products'
                                        ? 'text-blue-700'
                                        : 'text-white'
                                }`}
                            >
                                Products
                            </Link>

                            <Link
                                href={'/user-auth/login'}
                                className={`block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:hover:text-blue-300 ${
                                    currentRoute === '/user-auth/login'
                                        ? 'text-blue-700'
                                        : 'text-white'
                                }`}
                            >
                                Account
                            </Link>

                            <Link
                                href={'/cart'}
                                className={`block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:hover:text-blue-300 ${
                                    currentRoute === '/cart'
                                        ? 'text-blue-700'
                                        : 'text-white'
                                }`}
                            >
                                Cart{' '}
                                <FontAwesomeIcon
                                    size="1x"
                                    icon={faShoppingCart}
                                />
                                {cart?.length > 0 ? (
                                    <span className="text-red-500 font-extrabold">
                                        {`(${cart?.length})`}
                                    </span>
                                ) : (
                                    `(0)`
                                )}
                            </Link>
                        </section>
                    </div>
                </div>
            </nav>
            {/* mobile */}

            {mobileMenuOpen && (
                <div className="md:hidden fixed bg-black w-full h-full">
                    <section className="flex flex-col py-4 items-center justify-center text-2xl space-y-6">
                        <Link
                            href={'/'}
                            className={`${
                                currentRoute === '/'
                                    ? 'text-blue-700'
                                    : 'text-white'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href={'/products'}
                            className={`${
                                currentRoute === '/products'
                                    ? 'text-blue-700'
                                    : 'text-white'
                            }`}
                        >
                            Products
                        </Link>
                        <Link
                            href={'/user-auth/login'}
                            className={`${
                                currentRoute === '/user-auth/login'
                                    ? 'text-blue-700'
                                    : 'text-white'
                            }`}
                        >
                            Account
                        </Link>
                        <Link
                            href={'/cart'}
                            className={`${
                                currentRoute === '/cart'
                                    ? 'text-blue-700'
                                    : 'text-white'
                            }`}
                        >
                            Cart{' '}
                            {cart?.length > 0 ? (
                                <span className="text-red-500 font-extrabold">
                                    {`(${cart?.length})`}
                                </span>
                            ) : (
                                `(0)`
                            )}
                        </Link>
                    </section>
                </div>
            )}
        </header>
    );
}
