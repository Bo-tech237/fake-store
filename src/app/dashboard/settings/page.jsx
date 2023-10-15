import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';
import SettingForm from '@/components/SettingForm';

export default async function Settings() {
    await dbConnect();
    const users = await User.find({ role: 'Admins' });

    return (
        <section>
            <SettingForm users={users} />
        </section>
    );
}
