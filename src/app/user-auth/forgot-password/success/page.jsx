import Link from 'next/link';

export default function Success() {
    return (
        <div className="grid place-items-center bg-gray-300 h-screen">
            <div className="shadow-lg p-5 mx-2 bg-white rounded-lg border-t-4 border-blue-600">
                <h2 className="text-xl font-bold my-4">Password Reset</h2>
                <h3 className="text-xl font-bold my-4">
                    If the email does not show up, check your spam folder.
                </h3>

                <button className="bg-blue-900 text-white font-bold cursor-pointer px-6 py-2">
                    <Link
                        className="text-sm mt-3 text-right"
                        href={'/user-auth/login'}
                    >
                        Back to Login
                    </Link>
                </button>
            </div>
        </div>
    );
}
