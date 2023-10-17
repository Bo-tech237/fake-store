'use client';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { User } from '@/models/User';

export default function SettingNewRole() {
    const [id, setId] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUserByEmail() {
            const user = await User.findOne({ email });
            setUserName(user?.username);
            setRole(user?.role);
            setId(user?._id);
        }

        fetchUserByEmail();
    }, [email]);

    function openDialog() {
        setDialogOpen((bool) => !bool);
    }
    function closeDialog() {
        setDialogOpen(false);
    }

    const data = {
        id,
        username,
        email,
        role,
    };

    async function UpdateRole() {
        try {
            setLoading(true);

            const response = await axios.put('/api/users/', data);

            if (response.status === 201) {
                setDialogOpen(false);
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
                    <div className="pt-2">
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
                <div className="p-16 flex flex-col gap-3">
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
                        <button
                            onClick={closeDialog}
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Canceling...' : 'Cancel'}
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
