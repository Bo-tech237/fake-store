'use client';
import { axiosInstance } from '@/axios/axiosInstance';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axiosInstance.post('/api/auth/register', {
                username,
                email,
                password,
            });

            console.log('register', response.data);

            if (response?.status === 201) {
                setUsername('');
                setEmail('');
                setPassword('');
                router.push('/user-auth/login');
            }
        } catch (error) {
            if (error.response.data === 400 || 409) {
                setError(error.response.data);
            }

            console.log('Error:', error);
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Full Name..."
                        required
                    />
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
                    <button
                        disabled={loading}
                        className="bg-blue-900 text-white font-bold cursor-pointer px-6 py-2"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link
                        className="text-sm mt-3 text-right"
                        href={'/user-auth/login'}
                    >
                        Already have an account?{' '}
                        <span className="underline text-blue-900">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
