import LoginForm from '@/components/LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Header from '@/components/Header';

export default async function Login() {
    const session = await getServerSession(authOptions);

    if (session?.user?.role === 'Admins') {
        redirect('/dashboard');
    } else if (session?.user?.role === 'User') {
        redirect('/account');
    }

    return (
        <section>
            <div className="bg-black text-white">
                <div className="max-container">
                    <Header />
                </div>
            </div>
            <LoginForm />
        </section>
    );
}
