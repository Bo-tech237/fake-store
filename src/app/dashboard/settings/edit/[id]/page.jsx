import { User } from '@/models/User';
import dbConnect from '@/dbConfig/dbConnect';
import EditSettingForm from '@/components/EditSettingForm';

export default async function EditSettings({ params: { id } }) {
    await dbConnect();
    const user = await User.findById(id);

    console.log('set', user);

    const content = user && <EditSettingForm user={user} id={id} />;

    return content;
}
