import PasswordResetForm from '@/components/PasswordResetForm';

export default function PasswordReset({ params: { token } }) {
    return (
        <section>
            <PasswordResetForm token={token} />
        </section>
    );
}
