import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';

export default async function Settings() {
    await dbConnect();
    const users = await User.find({ role: 'Admins' });

    return (
        <div>
            Settings
            <div>
                {users.map((user) => (
                    <h2 key={user._id}>
                        {user.username} Role: {user.role}
                    </h2>
                ))}
            </div>
        </div>
    );
}
