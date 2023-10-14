'use client';
import { signOut, useSession } from 'next-auth/react';

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <section>
            <div className="flex flex-wrap justify-between items-center">
                <p className="font-bold">{session?.user?.name}</p>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white rounded font-bold px-6 py-2"
                >
                    Logout
                </button>
            </div>
        </section>
    );
}
