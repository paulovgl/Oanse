import Logo from '@/public/logo-oanse';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
    return (
        <main className="flex flex-col h-screen w-screen bg-red-200 md:flex-row">
            <div className="flex h-36 items-center justify-center bg-transparent shadow-2xl rounded-md p-3 md:h-screen md:w-2/6">
                <Logo width={257} height={128} />
            </div>
            <LoginForm />
        </main>
    );
}