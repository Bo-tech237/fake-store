'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/axios/axiosInstance';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axiosInstance.post('/api/send-email', {
            email,
        });

        if (response?.error) {
            setError('Invalid credentials');
            return;
        }

        console.log('forgotPwd', response.error);

        if (response?.status === 200) {
            router.push('/user-auth/forgot-password/success');
        }

        try {
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div className="grid place-items-center bg-gray-300 h-screen">
            <div className="shadow-lg p-5 mx-2 bg-white rounded-lg border-t-4 border-blue-600">
                <h2 className="text-xl font-bold my-4">Reset Password</h2>
                <h3 className="text-xl font-bold my-4">
                    Enter your email address to get instructions for resetting
                    your password
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap3">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email.."
                        required
                    />

                    <button className="bg-blue-900 text-white font-bold cursor-pointer px-6 py-2">
                        Reset Password
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-center text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link
                        className="text-sm mt-3 text-right"
                        href={'/user-auth/login'}
                    >
                        Back to{' '}
                        <span className="underline text-blue-900">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
