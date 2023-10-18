'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Account() {
    const { data: session } = useSession();

    return (
        <section className="flex flex-col items-center justify-center min-h-screen gap-5">
            <div>
                {session?.user.role === 'User' && (
                    <button
                        onClick={() => signOut()}
                        className="bg-red-500 text-white rounded font-bold px-6 py-2"
                    >
                        Log Out
                    </button>
                )}
            </div>
            <p>Welcome {session?.user.username}</p>
        </section>
    );
}
