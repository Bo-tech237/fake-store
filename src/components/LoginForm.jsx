'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            setLoading(true);

            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            console.log('login', response);
            if (response?.error) {
                setError('Invalid credentials');
                return;
            }

            console.log('loginSession', session);

            if (session?.user?.role === 'Admin') {
                setEmail('');
                setPassword('');
                router.push('/dashboard');
            } else if (session?.user.role === 'User') {
                setEmail('');
                setPassword('');
                router.push('/account');
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-600">
                <h2 className="text-xl font-bold my-4">
                    Enter your credentials
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap3">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email.."
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password..."
                        required
                    />
                    <Link
                        className=" my-2 text-right"
                        href={'/user-auth/forgot-password'}
                    >
                        <span className="text-blue-900">
                            Forgot your password?
                        </span>
                    </Link>
                    <button
                        disabled={loading}
                        className="bg-blue-900 text-white font-bold cursor-pointer px-6 py-2"
                    >
                        {loading ? 'Login...' : 'Login'}
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-center text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link
                        className="text-sm mt-3 text-right"
                        href={'/user-auth/register'}
                    >
                        Don&apos;t have an account?{' '}
                        <span className="underline text-blue-900">
                            Register
                        </span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
