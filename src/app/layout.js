import './globals.css';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AuthProvider } from '@/authProviders/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Fake Store',
    description: 'E-commerce Store',
};

export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                <AuthProvider session={session}>{children}</AuthProvider>
            </body>
        </html>
    );
}
