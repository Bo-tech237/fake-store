import { User } from '@/models/User';
import dbConnect from '@/dbConfig/dbConnect';
import EditSettingForm from '@/components/EditSettingForm';

export default async function EditSettings({ params: { id } }) {
    await dbConnect();
    const response = await User.findById(id);

    const user = JSON.parse(JSON.stringify(response));

    const content = user && <EditSettingForm user={user} id={id} />;

    return content;
}
