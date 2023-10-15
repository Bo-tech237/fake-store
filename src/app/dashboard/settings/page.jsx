import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';
import SettingTable from '@/components/SettingTable';

export default async function Settings() {
    await dbConnect();
    const users = await User.find({ role: 'Admins' });

    return <section>{users && <SettingTable users={users} />}</section>;
}
