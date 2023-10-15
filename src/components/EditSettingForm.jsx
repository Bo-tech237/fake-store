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
            password: user.password,
            role,
        };

        try {
            setUpdate(true);
            const response = await axiosInstance.put('api/users', data);
            if (response.status === 200) router.push('/dashboard/settings');
        } catch (error) {
            console.log('Error', error);
        } finally {
            setUpdate(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Role</label>
                <input
                    type="text"
                    placeholder="Role..."
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary" disabled={update}>
                    {update ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
}
