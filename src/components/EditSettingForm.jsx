'use client';
import { axiosInstance } from '@/axios/axiosInstance';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditSettingForm({ user, id }) {
    const [role, setRole] = useState(user?.role);
    const [update, setUpdate] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            id,
            username: user.username,
            email: user.email,
            role,
        };

        try {
            setUpdate(true);
            const response = await axiosInstance.put('/api/users', data);

            if (response.status === 200) {
                router.push('/dashboard/settings');
                router.refresh('/dashboard/settings');
            }
        } catch (error) {
            console.log('Error', error);
        } finally {
            setUpdate(false);
        }
    }

    return (
        <div>
            <p className="text-center py-4 mb-10 text-2xl md:text-4xl">
                Update <span className="text-blue-900">{user.username}</span>{' '}
                Role
            </p>
            <div className="flex justify-center">
                <form
                    className="flex flex-col justify-center gap-5"
                    onSubmit={handleSubmit}
                >
                    <div className="">
                        <label>Role</label>
                        <input
                            type="text"
                            placeholder="Role..."
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="btn-default"
                            onClick={() => router.push('/dashboard/settings')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={update}
                        >
                            {update ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
