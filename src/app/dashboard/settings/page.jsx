import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/User';
import SettingTable from '@/components/SettingTable';

export default async function Settings() {
    await dbConnect();
    const response = await User.find({ role: 'Admin' });
    const users = JSON.parse(JSON.stringify(response));

    return <section>{users && <SettingTable users={users} />}</section>;
}
