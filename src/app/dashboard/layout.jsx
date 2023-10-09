'use client';
import Nav from '@/components/Nav';
import { useState } from 'react';

export default function Layout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="bg-blue-900">
            <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex text-white items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden"
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
            <div className="flex flex-col justify-between">
                <div className="flex min-h-screen">
                    <Nav
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                    />
                    <div className="bg-white flex-grow mt-2 rounded-t-lg md:mb-2 md:mr-2 md:rounded-lg p-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
