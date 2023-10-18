'use client';
import { useState } from 'react';
import Modal from '@/components/Modal';
import { axiosInstance } from '@/axios/axiosInstance';
import { useRouter } from 'next/navigation';

export default function SettingNewRole() {
    const [id, setId] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function openDialog() {
        setDialogOpen((bool) => !bool);
    }
    function closeDialog() {
        setDialogOpen(false);
    }

    async function UpdateRole() {
        try {
            setLoading(true);

            const data = {
                id,
                username,
                email,
                role,
            };

            const response = await axiosInstance.put('/api/users/', data);

            if (response?.status === 200) {
                router.refresh('/dashboard/settings');
                closeDialog();
                setEmail('');
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            if (!email) return;

            const response = await axiosInstance.get('/api/users/');

            const users = await response?.data.users;
            const userArray = users.filter((user) => user.email === email);
            const user = userArray[0];

            if (!user) return;
            setUserName(user?.username);
            setRole(user?.role);
            setId(user?._id);

            openDialog();
        } catch (error) {
            console.log('Error', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <div>
                <form
                    className="flex justify-center space-x-5"
                    onSubmit={handleSubmit}
                >
                    <div className="">
                        <label>Role</label>
                        <input
                            type="email"
                            placeholder="Email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search User'}
                        </button>
                    </div>
                </form>
            </div>
            <Modal open={dialogOpen}>
                <div className="p-16 flex flex-col gap-3 border-2 border-gray-500 rounded">
                    <p className="text-center flex gap-1">
                        Assign new role to
                        <span className="text-blue-900">{username}</span>
                    </p>
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
                    <div className="pt-2 flex justify-between">
                        <button onClick={closeDialog} className="btn-primary">
                            Cancel
                        </button>
                        <button
                            onClick={UpdateRole}
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
