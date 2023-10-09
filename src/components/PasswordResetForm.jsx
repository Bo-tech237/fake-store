'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/axios/axiosInstance';

export default function PasswordResetForm({ token }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setError('Confirm Password does not match.');
            return;
        }

        const response = await axiosInstance.post(
            '/api/reset-password/' + token,
            {
                password,
                confirmPassword,
            }
        );

        if (response?.status === 200) {
            router.push('/user-auth/login');
        }

        try {
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-600">
                <h2 className="text-xl font-bold my-4">
                    Choose a new password.
                </h2>

                <h3 className="text-xl font-bold my-4">
                    You can reset your password here.
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap3">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password..."
                        required
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm Password..."
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
