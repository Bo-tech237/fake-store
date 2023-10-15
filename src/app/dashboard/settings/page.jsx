import { User } from '@/models/User';

export default async function Settings() {
    const user = await User.find({ role: 'Admins' });
    console.log('settings', user);
    return <div>Settings</div>;
}
