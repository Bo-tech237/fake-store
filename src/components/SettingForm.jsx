'use client';
import Link from 'next/link';
import { axiosInstance } from '@/axios/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function SettingForm({ users }) {
    return (
        <section>
            <table className="back">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link
                                    href={
                                        '/dashboard/settings/edit/' + user?._id
                                    }
                                    className="bg-blue-900 text-white py-1 px-2 mb-2 mr-2 rounded-md inline-flex gap-1 items-center"
                                >
                                    <FontAwesomeIcon size="1x" icon={faPen} />
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
